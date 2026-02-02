---
title: Replacing text in multiple files
description: After encountering issues with generated reports, a streamlined approach is discovered to edit multiple HTML files using Perl's search and replace functionality, allowing for quick updates without the need for extensive scripting or file management.
last_updated_at: 2010-05-12T21:27:00
categories: 
  - tutorial
  - feature
backgroundImage: /img/code/find-and-replace.jpg
---

Recently I took a new job, and it involves a lot of report generating. This has been a great fit for me, and I have enjoyed the short time here in St Paul, MN.

The process for the current project is to:

1. Pull a *.csv file from an email account
2. Parse the data into a database query/queries
3. Generate HTML code
4. Store the HTML in a directory structure 
5. Store the report information in the database

Unfortunately, during testing I have had some typos, and the generated report stored in the directory structure did not display as intended. The changes needed really didn't warrant processing the script again and adding more useless entries into the database, so I decided to change the script and then update the HTML in the report.

Having over 100 reports generated, I needed a simple script to do this. I had done this with bash before. However, I thought there had to be an easier way than looping through a for statement, saving the changes to a new file and then moving the new file to replace the old.

In comes Perl. Looking through some posts, I found that you can edit text in the file with Perl. The command goes something like this:

```bash
perl -pi -w -e 's/search/replace/g;' *.html
```

Here is a further explanation of what is going on. 

`-p` assume loop (like `-n`) but print line also, like sed

`-i` edit <> files in place (makes backup if extension supplied)

`-w` enable many useful warnings (RECOMMENDED)

`-e` execute the following line of code

The code referred to after the `-e` is just a search and replace regular expression. 

The `s/` means to search and start your regular expression to search for. 

You then enter your expression that you want to search for. You need to make sure you escape out special characters with the backslash [\]. The forward slash is used to separate what you are searching for and what you want to replace. The replacement section is an expression as well, and you need to treat special characters the same way.

Finally, you have the last forward slash indicates the end of your replacement expression and the `g` indicates global.

Here is an example of how I would change the directory used for images from `/image/` to `images/` for all the files in a directory with the extension of .html.

```bash
perl -pi -w -e 's/\/image\//images\//g;' *.html
```

That is how you do it. If you have to go through multiple directories, you could use a bash or perl command to loop through those directories. Hope it didn't confuse you too much.

Photo by [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
