---
title: Closure-Compiler and Ant to compress JavaScript
description: After exploring various methods for compressing JavaScript files using Ant, a new approach utilizing Closure-Compiler's Ant class simplifies the process, allowing for efficient compilation without the complexity of OS-specific configurations.
last_updated_at: 2012-04-05T21:27:00
categories:
  - html
backgroundImage: /img/code/compression.jpg
---

Having used Eclipse and now IntelliJ for some time, I have often found it handy to build applications with Ant. It has been some time since I have taken a look at the process I was using, and I really needed to find a better way to compress my JavaScript files, so I decided to look at refreshing the build.

My previous method had me setting up various properties, determining the OS being used and then targeting the compression of the JavaScript in the ant build.xml file. The process worked, but it was ugly and every OS had a different target for calling closure-compiler.

After several hours of reading the closure-compiler documentation, I happened to come across just what I was looking for (by accident). Closure-compiler now has a class for compiling in Ant [com.google.javascript.jscomp.ant.CompileTask]. What a find for me.

So here is how it works.

First, you need to define the jscomp task-

```xml
<taskdef name="jscomp" classname="com.google.javascript.jscomp.ant.CompileTask"
classpath="${basedir}/closure-compiler/build/compiler.jar"/>
```

This creates a task named jscomp using compiler jar and class named CompileTask located in the Closure-Compiler directory.

Next we need to create our target. I simply named mine "compile". Nested inside the target I call the jscomp task passing it the attributes. This was tricky as some of the values passed to the attributes differ from the documented values.

For example, the compilation level will accept the following values "WHITESPACE_ONLY", "SIMPLE_OPTIMIZATIONS", "ADVANCED_OPTIMIZATIONS" via command line, but with the class the attribute values are "whitespace", "simple", "advanced".

Finally, nested inside the jscomp task, we define our "externs" and "source" files. In my case I didn't really need to define any externs, but for a demonstration purpose, I have provided it the code.

```
<target name="compile">

    <jscomp compilationlevel="simple" warning="verbose" debug="false"
            output="${assetsPath}/myfile.min.js">

        <externs dir="${basedir}/closure-compiler/contrib/externs">
            <file name="jquery-1.7.js"/>
        </externs>

        <sources dir="${assetsPath}">
            <file name="myfile.js"/>
        </sources>

    </jscomp>

</target>
```

That should be all you need inside your ant build file to create your compressed/minified JavaScript code.

Photo by [Mitchell Luo](https://unsplash.com/@mitchel3uo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
