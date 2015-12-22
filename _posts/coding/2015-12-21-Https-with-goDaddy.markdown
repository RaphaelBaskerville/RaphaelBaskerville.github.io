---
layout: post
categories: coding
---
godaddy help link: https://www.godaddy.com/help/http-vs-https-5454

HTTP VS. HTTPS

HTTP, or hypertext transfer protocol, is the way a Web server communicates with browsers like Internet Explorer® and Mozilla Firefox®. HTTP lets visitors view a site and send information back to the Web server.

HTTPS, hypertext transfer protocol secure, is HTTP through a secured connection. Communications through an HTTPS server are encrypted by a secure certificate known as an SSL. The encryption prevents third-parties from eavesdropping on communications to and from the server.

Only servers that have their own SSL can create HTTPS connections. A site's visitor cannot encrypt the connection.

If you have a hosting account with an SSL encrypting its connection, you can automatically redirect visitors to the HTTPS version of your site.

## Follow these steps:

Find the security options on the main cPanel page and click on the SSL/TLS icon to view SSL options.

## SSL/TLS options:

Click the link for (CSR)

<img src="{{ site.baseurl }}/images/HTTPS/httpsStep1.jpg" class="fit image small">

Enter your domain name and click generate at the bottom of the screen.  Now you have a certificate attached to your domain, but you still need to install it.  To install the certificate, go back to the SSL/TLS menu.

Click the link for managing your SSL sites

<img src="{{ site.baseurl }}/images/HTTPS/httpsStep2.jpg" class="fit image small">

Fill out the form, click install, and you're done.
