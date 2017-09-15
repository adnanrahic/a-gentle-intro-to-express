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