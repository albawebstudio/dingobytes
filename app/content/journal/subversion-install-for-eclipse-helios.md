---
title: Subversion install for Eclipse Helios
description: After upgrading to Eclipse Helios and encountering dependency issues with the Subversive Connector, a solution is found by enabling the appropriate update site, allowing for a successful installation of the SVN Team Provider and its connectors.
last_updated_at: 2010-12-22T21:27:00
categories:
  - tutorial
backgroundImage: /img/code/svn-connector-error.jpg
---

<figure>
    <a href="/img/code/SVN-Connector-Error.png">
        <img src="/img/code/SVN-Connector-Error.png" alt="SVN Connector Error" title="SVN Connector Error" />
    </a>
    <figcaption>SVN Connector Error</figcaption>
</figure>

So I recently upgraded from Galileo to Helios, and although I tried to use the upgrade instructions online, I had too many dependency issues and had to do a fresh installation.

I decided to start from scratch and removed the eclipse folder, deleted all cached and preference data and wiped out the `workspace/.metadata`.

I downloaded the Eclipse IDE for Java Developers (because the Classic version does not have the new Eclipse Marketplace) and started to reinstall some of the most useful plugins.

This is when I ran into the issue with the Subversive Connector. I went to Help > Install New Software and pulled up the 'Helios – http://download.eclpse.org/releases/helios'. I opened up the Collaboration tree and scrolled down and chose the 'Subversive SVN Team Provider' and installed it. After the installation, you will get a prompt to install the connector (your choice of SVNKit or JavaHL) with the Subversive Connector Discovery window. I chose the connectors I wanted, but when I tried to install, I got an error. The error 'Cannot complete installation – Problems occurred while performing installation: Operation details'

<figure>
    <img src="/img/code/Install-Window.png" alt="Install Window" title="Install Window" />
    <figcaption>Install Window</figcaption>
</figure>

I viewed the error log and was able to find there was a missing dependency. After searching the web using Google, I was able to find a solution.

To resolve this, you need to enable a subversive repository. Go to Help > Install New Software and then click the "Available Software Sites" link. In the window, you will get a list of available software. Scroll down the list and look for [http://download.eclipse.org/technology/subversive/0.7/update-site/](http://download.eclipse.org/technology/subversive/0.7/update-site/). Select it and then click the 'Enable' button and the click 'OK'.

<figure>
    <img src="/img/code/Subversive-Update-Site.png" alt="Subversive Update Site" title="Subversive Update Site" />
    <figcaption>Subversive Update Site</figcaption>    
</figure>

Back in the installation window, click into the 'Work with' field and either type in or select the [http://download.eclipse.org/technology/subversive/0.7/update-site/](http://download.eclipse.org/technology/subversive/0.7/update-site/). Here you will find a list of options for installation. I unchecked any 'Optional' choices and then installed (Next > Next > 'I Accept…' > Finish).

<figure>
    <img src="/img/code/Clean-Connector-Install.png" alt="Clean Connector Install" title="Clean Connector Install" />
    <figcaption>Clean Connector Install</figcaption>
</figure>

After the Eclipse IDE installs, choose 'Restart Now'. For me the Subversive Connector Discovery window came right back up. If it doesn't for you, try to create a new SVN Project. I chose my Subversive SVN connectors and clicked 'Finish' and presto the installation continues without error.

I hope this is helpful to anyone with a fresh installation.

Photo by [Shavr IK](https://unsplash.com/@shavr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
