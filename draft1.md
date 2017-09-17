---
layout:  Post
title:  A gentle intro to Express with 4 real world applications
description:  Building 4 sample applications from scratch using Node.js and Express and comparing them regarding their specific use case.
date:  2017-09-16
thumbnail: https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/coffee-1030971_1280.jpg
authors:
 - AdnanRahic
---

Web development has come a long way since the WWW boom in the late nineties. We as developers now have infinite resources and tools at our disposal. The sheer versatility we have is mind-blowing. With the rise of Node.js and npm, JavaScript has become the de-facto most used programming language in the world. It's like every day a new framework pops up. Annoying as hell, I know. But, let's get on the hype train and check out how to build cool stuff with Node.js. If you haven't tried it yet, you'll love it, I'm sure!
 
Today we'll create four different types of apps using Express.js, the most popular Node.js framework.

Before we jump in there are a couple of things we need to go over regarding Node.js and Express, just to get our bearings straight.

## Get your feet wet
Node is an asynchronous event driven JavaScript runtime built upon Chrome’s V8 JavaScript engine. It’s designed to build scalable network applications. JavaScript is single-threaded, so Node's strength lies in it's asynchronous nature. It handles events without blocking the main thread of execution. This is why Node is blazingly fast, because it can handle connections concurrently.

The real reason Node.js blew up and became as popular as it is today is the package manager that comes along for the ride. NPM is the main meeting place for all Node packages, hence its name. Node Package Manager, duh? Here you can find various code modules to use in your applications, or publish your own if you so wish.

One of these modules is Express.js, a super popular, minimalist framework for quickly building Node.js applications. Express is today the de-facto primary framework for use with Node.js. With much reason indeed. It only provides a thin layer of fundamental abstraction without changing the core features Node is famous for. It makes is easy to create both web apps, and REST APIs with little to no hassle. So easy in fact that many other frameworks are based on Express!

Now you're wondering what kind of apps can you even build with Express? Let's have a second to talk it through. What're the main types the web supports? There are applications with server rendered HTML pages, which will be familiar to some of you old school programmers. This was the default way of creating apps in the pre-JavaScript hype era. Then we have REST APIs. They're used to send and receive JSON payloads storing them in a database. Lastly we have simple static websites. In this scenario Express is used to spin up a server and serve these files. It's a quick way of creating landing pages or marketing pages for companies and start-ups.

## Jumping in head first
Learning by doing is by far the best principle for learning anything new, especially in programming. Let's dive in and explain things along the way.

### Server Rendered Applications
You can guess how these apps work from the title right? The HTML pages rendered in a users browser are generated and rendered on the server. This process is called server rendering. Apps like these consist of templating engines and templates. The engines generate the final HTML page to be rendered. Some popular engines include Jade, Pug and EJS. What's so special about these engines? They have a fancy thing called interpolation. It enables inserting variables into a template or string. Like this example with Jade: ```Hello #{world}``` where ```world``` is a variable.

Let's check it out in action.

Create a new directory and open up a terminal window. Init npm in the directory and install the following modules.
```
npm init
npm install --save express jade
```

The structure of this project is very simple. An **app.js** file for all app configurations, a server.js file for spinning up an http server and a views folder where all our templates will be stored. First, create the **app.js** file and paste this snippet of code into it.

```js
// copy this into your app.js
var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Hello World!' });
});

module.exports = app;
```

Okay, what's going on here? We're requiring express and instantiating the app object. Path is a built in node module that provides a way of working with files and directories. We use it in this example to make sure our file paths work on all platforms. Then we set the the view engine and the folder where our templates are located. The view engine we'll be using in this sample will be Jade, but any is fine. Now comes the fun part, see the ```.get()``` method on the app object? It takes 2 parameters. First a route, then a callback function. When the ```'/'``` route is hit, the callback will be invoked. This will trigger the rendering of the index template, with a interpolated variable named ```title``` with the value of ```'Hello World!'```. Finally we export the app to have access to it in other files.

Awesome! With that out of the way, let's create the **server.js** file and add this snippet.

```js
var app = require('./app');
var port = 3030;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
```

Here we require the **app.js** file and tell it to listen on port 3030.

There's only one more thing to do, create the views folder with some templates. Go ahead and add the views folder now, and drop in these two templates.

```jade
<!-- layout.jade -->
doctype html
html
  head
    title= title
  body
    block content

```

```jade
<!-- index.jade -->
extends layout

block content
  h1= title
  p Welcome to #{title}

```

As you can see the syntax for the jade templating engine is pretty freaky compared to regular HTML. But don't let it fool you. In the end, it will be rendered as regular HTML in the browser. See the funny looking `#{title}`? This is the interpolation I mentioned above. The title variable from the callback function was passed along to the view, getting rendered as the value which was provided.

Your final folder structure of the sample app should look something like this.
```
> node_modules
> views
 - index.jade
 - layout.jade
- app.js
- package.json
- package-lock.json // this file will be present only if you have NPM version 5 or above.
- server.js 
```
Take a look at the [repo](https://github.com/adnanrahic/a-gentle-intro-to-express/tree/master/sample1-server-rendered) to catch up if you missed some of the steps.

Phew, finally we can run the app to see what it looks like. Jump back to your terminal and run:
```
node server.js
```

You should see ```Express server listening on port 3030``` get logged back to your terminal. Check your browser, you'll see the rendered view.

![sample1 browser image](https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/Screenshot%20from%202017-09-15%2022-50-56.png)

### REST APIs
Ready to get your world turned upside down? Welcome to REST APIs. The acronym stands for **R**epresentative **S**tate **T**ransfer. But you will never need to remember that. What's important though is to understand the logic behind how REST works and why it is the preferred type of data delivery. The core lies in creating an API, an **A**pplication **P**rogram **I**nterface, to send and receive data in JSON format. REST APIs are used to interact with databases to store data in a persistent manner.

Let's check it out in action.

For this example we only need two modules. Express and Body-parser. Create a new directory and run:
```
npm init && npm install --save express body-parser
```

We only need two files to make the sample app work so go ahead and create an **app.js** and a **server.js**.

Copy these snippets into the files.

```js
// app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  var data = {
    message: 'Hello World!'
  };
  res.status(200).send(data);
});

app.post('/', function (req, res, next) {
  var data = req.body;
  // query a database and save data
  res.status(200).send(data);
});

module.exports = app;
```

```js
// server.js
var app = require('./app');
var port = 4040;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
```

The layout of the app.js is very similar to the server rendered example. The only real difference is that we send back an object as the response of the ```get()``` method. Let's break it down. At the top we again require express, and create an app object. But, we also require body-parser. This is an awesome module for parsing the body of an incoming http request. It creates an object on the ```req``` object inside the app methods. So when we post some data to the ```'/'``` route we have access to that data in the ```req.body``` object. Awesome! To test this out fire up Postman or any other REST client testing tool you like. If you've never heard of this before, don't panic, [here's the download link](https://www.getpostman.com/).

Fire up the **server.js** and open up Postman.

```
node server.js
```

Start off by sending a GET request to http://localhost:4040/.

![get request](https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/Screenshot%20from%202017-09-15%2016-44-02.png)

Now send a POST request to the same url.

![post request](https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/Screenshot%20from%202017-09-15%2016-43-50.png)

Enter some JSON data into the body of the request and hit send. All the data you send to the endpoint gets sent back to you as the response.

Switch back to the code and let's explain what's going on. We first assign the value of ```req.body``` to the ```data``` variable. Then we send the data back in the response with a status of 200. 

Requests like these which are used solely as means of transferring data to and from a server are used to store data in persistent storage such as databases. This is what REST APIs are awesome at. In today's world they thrive because they work in unison with both mobile and web applications as their data storage.

If you missed any steps, you can check out the code [here](https://github.com/adnanrahic/a-gentle-intro-to-express/tree/master/sample2-rest-api).

### Static Websites
What if we don't need any cool template rendering, nor interaction with a database? What if we just want a cool landing page or an awesome proof of concept page?

Let's ignore all the complicated use cases we mentioned above and focus on the foundations the World Wide Web is based upon. Serving HTML documents.

Express can be turned into a simple HTTP web server for serving static HTML pages. The process is dead simple. What's needed is to specify a location which will be viewed as a static directory.

Let's dive in.

Create a new directory, create the same two files as the examples above, an app.js and a server.js. You'll only need to install express for this example.

```
npm init && install express --save
```

```js
// app.js
var express = require('express');
var app = express();

app.use('/', express.static('html'));

module.exports = app;
```

The app is set to ```.use()``` the html folder to serve static files. Meaning the route to the resource in the url will not look for routes in the express app, instead search the file system for the requested file.

You can simple re-use the **server.js** from the examples above.

```js
// server.js
var app = require('./app');
var port = 5050;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
```

Create an html folder and add two files named **index.html** and **about.html**. The content of the files does not matter, I've just added some text to know which one is which.

```html
<!-- index.html -->
<h1>index</h1>
```

```html
<!-- about.html -->
<h1>about</h1>
```

That's all. Go ahead, spin up the server and open up a browser. 

![show index html](https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/Screenshot%20from%202017-09-15%2022-51-39.png)

You can see by requesting the ```'/'``` route the **index.html** has been loaded by default. You can switch to ```'/about.html'``` and the about page will be loaded. This principle works with any type of file. You can add an image to this folder as well. It will be displayed the same way if you navigated to it though the url.

![show about html](https://raw.githubusercontent.com/adnanrahic/cdn/master/a-gentle-intro-to-express/Screenshot%20from%202017-09-15%2022-51-45.png) 

If you missed any steps, take a break and check out the code [here](https://github.com/adnanrahic/a-gentle-intro-to-express/tree/master/sample3-static).

### Hybrid apps
No we're not going to go talk about the Toyota Prius. This is another type of hybrid. Let's say, you want the versatility, power, and ease of use of a REST API, but also the speed of a **S**ingle **P**age **A**pplication.

_**Quick** info: SPAs are front end JavaScript applications which only have a single main index.html file. All other html files are templates that get injected into the main file when needed. Because the logic and routing are handled on the front end they are incredibly fast. But in the end, they behave just as a simple static webpage when it comes to serving them._

If this is the case, you may think about this scenario. Why not run a REST API, with a statically served SPA on the same server. Sounds good to me.

Fire up a terminal, create a new directory and type:
```
npm init && npm install --save express body-parser
```

Let's get introduced to the folder structure.

```
-> app // folder that will hold all of our files for the SPA
-> node_modules
- app.js
- package-lock.json
- package.json
- server.js
```

The structure is the same as in the static file serving example, with the difference in the name of the folder where we'll be keeping our static files.

Here's some code.

```js
// app.js
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API
 */
app.get('/api', function (req, res, next) {
  var data = {
    message: 'Hello World!'
  };
  res.status(200).send(data);
});
app.post('/api', function (req, res, next) {
  var data = req.body;
  // query a database and save data
  res.status(200).send(data);
});

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));

// Default every route except the above to serve the index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

module.exports = app;
```

This structure seems familiar now doesn't it. We've combined the REST API with the serving static files. The only exception being the last ```.get()``` on the bottom. The ```*``` means every route expect for the ones above will be defaulted to send the **index.html** back to the client. Meaning **every** route will serve the main **index.html**. Exactly what we want!

Now when we want to retrieve some data from the API we can simply hit the ```'/api'``` route and get JSON data back. Otherwise the app will always serve the main html file located in the app folder. 

Not to go into more detail, the you can check out the full example using Angular.js over [here](https://github.com/adnanrahic/a-gentle-intro-to-express/tree/master/sample4-hybrid).

## When to use what?
No application type is the best in every scenario. They all have their place in the programming world. It all depends on your use case and what you want to build. 

If you want a robust back end without worrying too much about the front end would truly love server rendered applications. They have great templating engines that simplify the way you write HTML, making it very easy to create intricate templates. They also provide great support for storing and retrieving data. 

REST APIs are the applications of choice when you have multiple front ends to manage. The data you receive can be requested from both mobile and web applications. Isn't it awesome that you can build one back end that can be consumed by all the client side apps you want? I sure think it is!

Serving static files is used in various cases. Serving HTML files, images, CSS style sheets and JavaScript scripts. All are viewed as static files and they can all be served with Express. This is most used for creating landing pages and other front end applications such as Single Page Apps. Feel free to use this technique for all of your apps. It will always be useful to know how to serve static files such as images and CSS!

What's there to say about hybrid apps? Well, first of all. Please, if you have access to two web servers, keep the applications separate. Create the REST API on one, and the SPA on the other. But if you don't have that luxury, it's fine to keep it on one. Otherwise, this app combo is the best regarding performance.

## Go start building stuff!
All of these techniques are valid and perfectly fine to use. Just pick one and start building! You'll learn the most by doing it yourself.

Hope you guys and girls enjoyed reading this as much as I enjoyed writing it. Until next time, be curious and have fun.

*Do you think this tutorial will be of help to someone? Do not hesitate to share. If you liked it, let me know in the comments below.*