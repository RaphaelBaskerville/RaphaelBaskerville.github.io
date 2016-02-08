---
layout: post
title:  "Simple Express Server"
date:   2016-1-10 00:50:32 -0800
categories: coding
---

# Express and Node

## Making a simple server.

{% highlight ruby %}
// Require express and define app as an express instance.
// Using express will simplify much of the code you are writing on the server-side.
var express = require('express');
var app = express();
// path grants useful pathing functionality. __dirname which ensures that your path will always start at the root of your app's directory
var path = require("path");
// Require the app js file in whice we connect to the database.
var db = require('./public/app.js');
// Use some logic to update the port dynamically depending on where the app is being served.  
// This line allows our server to use the port provided when your app is deployed or default to 8080 if there is no environmental port supplied.
var port = process.env.PORT || 8080;
// Body parser helps with parsing and stringifying data coming in and going out of the server.
var bodyParser = require('body-parser');

// Middleware:
// This is where we tell our app to use some of the middleware we required above.

// Express static specifies the directory in which the server should look first to serve files.
app.use(express.static(__dirname + '/public'));

// Here we tell the server which format to parse data to.
app.use(bodyParser.json());

// Define what the server should do when it receives a get request to /url
app.get('/data', function (req,res) {
  if (err) { // if there was an error
    respond with status code 500
    res.send(500);
  } else { // if there was no error
    // respond with status code 200 and send the data.
    res.status(200).send('This is the data');

  });
});

// Post request handling
app.post('/data', function (req,res) {
  // do something with the data
  console.log(res.body);
  // send a status code of 200.
  res.status(200).send()
});


// set the port to listen on.
app.listen(port);
{% endhighlight %}
