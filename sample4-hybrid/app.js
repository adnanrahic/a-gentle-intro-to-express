var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API
 */
app.get('/api/', function (req, res, next) {
  var data = {
    message: 'Hello World!'
  };
  res.status(200).send(data);
});
app.post('/api/', function (req, res, next) {
  var data = req.body;
  // query a database and save data
  res.status(200).send(data);
});

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

module.exports = app;