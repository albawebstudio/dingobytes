---
title: Getting Xdebug working within Intellij 2016
description: Using IntelliJ for PHP development can be enhanced by properly configuring Xdebug with Vagrant, which involves adjusting settings in the PuPHPet configuration and IntelliJ preferences to ensure seamless debugging functionality.
last_updated_at: 2017-03-09T21:27:00
backgroundImage: /img/code/code-1839406.jpg
---

Using IntelliJ for PHP development is great, and although it is slightly different from PhpStorm, it can still be configured to deliver everything PhpStorm does.

Having been doing a lot of development with Vagrant, there have been a few occasions where Xdebug just doesn't seem to work. It turns out that it is fairly simple to get it working, but there are a few places where it breaks down. We'll try to break those down here (these instructions were put together quickly, so please feel free to let us know if there are gaps in the instructions, or we have some horrible spelling errors).

## Vagrant

Being lazy, we like to use tools to set up the vagrant box, and one of our favorites is <a href="https://puphpet.com/" title="A simple GUI to set up virtual machines for Web development.">PuPHPet</a>. This tool gets updated frequently, and although some assets occasionally don't get installed on the virtual machine, it is invaluable.

![Xdebug-PuPHPet](/img/code/Xdebug-PuPHPet.png "xdebug configuration using PuPHPet") Having checked the box to install Xdebug on almost every setup, we found that you might have to tweak the configuration if you want Xdebug to just work out of the box. To do this, find your vagrant config.yaml and search for the xdebug section. If you are using PuPHPet, it might look something like this:

```
xdebug:
    install: '1'
    settings:
        xdebug.default_enable: '1'
        xdebug.remote_autostart: '0'
        xdebug.remote_connect_back: '1'
        xdebug.remote_enable: '1'
        xdebug.remote_handler: dbgp
        xdebug.remote_port: '9000'
```

It took us some time to figure out what was wrong, but then we aren't always the sharpest tack in the box. If you notice the xdebug.remote_autostart setting, it is set to false. If we want this to just work out of the box, we will need to change the setting to true.

```
xdebug:
    install: '1'
    settings:
        xdebug.default_enable: '1'
        xdebug.remote_autostart: '1'
        xdebug.remote_connect_back: '1'
        xdebug.remote_enable: '1'
        xdebug.remote_handler: dbgp
        xdebug.remote_port: '9000'
```

Once this is done, you can reload your vagrant box `vagrant reload --provision` and the setting should build properly. If you don't want to reload vagrant, you can also ssh into your virtual machine and change the setting manually in the xdebug.ini file. Depending on your virtual machines operating system, it might be in a different location. We usually use Ubuntu so you can find the xdebug settings here `/etc/php/[version]/mods-available/99-xdebug.ini`. Manually change the setting and then restart php.

## IntelliJ

We set the development environment using the vagrant box in IntelliJ fairly easily. It is best to start the vagrant instance ahead of time. Click on Preferences > Languages &amp; Frameworks > PHP. From this point you can select the CLI Interpreter browser and then click the (+) to add a new remote interpreter.


<figure xmlns="http://www.w3.org/1999/html">
    <a href="/img/code/add-remote-php-interpreter.png"><img src="/img/code/add-remote-php-interpreter.png" alt="Add Remote PHP Interpreter" /></a>
    <figcaption>Add Remote PHP Interpreter</figcaption>
</figure>

<figure>
    <a href="/img/code/CLI-Interpreter.jpg"><img src="/img/code/CLI-Interpreter.jpg" alt="CLI-Interpreter" /></a>
    <figcaption>CLI-Interpreter</figcaption>
</figure>

When the new window appears, click the Vagrant radio and point the Vagrant Instance path to your vagrant folder and click "OK".

Once you have successfully set up the remote interpreter, you can click "Apply" or "OK" to save the setting.

At this point if you have not started the vagrant box, please get it started up. We want to make sure the server is running and that the absolute path is mapped properly.

Open the IntelliJ preferences again if it is closed out and navigate to Preferences > Languages &amp; Frameworks > PHP > Servers. Here you should see your remote server. What you will want to do is make sure that your sites document root is mapped properly. In our example the vagrant box is mapping `/var/www` to a folder in `/Users/Developer/Projects/rest_api/public`. Looking under the File/Directory column, we look to see if that folder has a corresponding mapping to `/var/www` and if not we add it. (Make sure to hit your return key after entering the path, or it will not save.) Once that is completed, you can click "OK" to save the changes.

You need to tell IntelliJ to "Start Listening for PHP Debug Connections" and you should be in business. Click on the line(s) of code you would like to set a break at and hit your site.

<figure>
    <a href="/img/code/Server.jpg"><img src="/img/code/Server.jpg" alt="PHP Server" /></a>
    <figcaption>PHP Server</figcaption>
</figure>

