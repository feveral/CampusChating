var express = require('express');
var chatServer = require('./lib/chat_server');
var app = express();


app.use(express.static('public'));
chatServer.listen(app.listen(80));