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