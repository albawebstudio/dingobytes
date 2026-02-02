---
title: Still learning HTML 5
description: While delving into HTML5 and CSS3, new input types are discovered along with a clever CSS technique to style all input elements except for password and file types, while also addressing compatibility issues with older versions of Internet Explorer.
last_updated_at: 2013-03-30T21:27:00
categories:
  - html
backgroundImage: /img/code/html5logo.jpeg
---

So as I continue to work on learning more about HTML5 and CSS3, I have come across a few new items.

It seems that there have been some new input values added to the type attribute. I did some digging to try to find a comprehensive list of them, and so far I have come up with the following:

```
input[type=checkbox]
input[type=color]
input[type=date]
input[type=datetime]
input[type=datetime-local]
input[type=email]
input[type=file]
input[type=month]
input[type=number]
input[type=password]
input[type=radio]
input[type=range]
input[type=search]
input[type=submit]
input[type=tel]
input[type=text]
input[type=time]
input[type=url]
input[type=week]
```

Wow! How I really like all the new options. Except now, I have run into a problem. I am using several different input types for a project (`checkbox`, `color`, `date`, `datetime`, `email`, `number`, `password`, `radio`, etc.), but I don’t want my password and file input types styled like the rest. I could just list all the elements in my stylesheet that I want to style accordingly, or I could use another method to style all the inputs EXCEPT the password and file inputs

```
input:not([type=password]):not([type=file]) {
    /* now I can style just what I want */
}
```

Front end work just got a bit more fun today!

UPDATE:

Just after posting this, I realized that something was wrong in IE8. After some digging I found out that IE does not support [highlightcode]:not[/highlightcode] selector until version 9 (of course it doesn’t right?). Ah, but some smart people out there have already taken care of this for us. You can add the following snippet at the head of your document to resolve this issue.

```
<!--[if lt IE 9]>
<script src="//ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
<![endif]-->
```
