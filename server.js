var express = require('express');
var chatServer = require('./server/chat_server.js');
var RSAServer = require('./server/RSAServer.js');
var RSAManager = require('./server/RSAManager.js');

var app = express();
var rsaRouter = express.Router();

new RSAServer(rsaRouter);

app.use('/rsa', rsaRouter);
app.use(express.static('public'));



chatServer.listen(app.listen(80));
