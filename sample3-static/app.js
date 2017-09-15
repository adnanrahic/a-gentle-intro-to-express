var express = require('express');
var app = express();

app.use('/', express.static('html'));

module.exports = app;