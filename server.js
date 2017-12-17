var express = require('express');
var chatServer = require('./server/chat_server.js');
var RSAServer = require('./server/RSAServer.js');
var AESServer = require('./server/AESServer.js');

var app = express();

var rsaRouter = express.Router();
var aesRouter = express.Router();

new RSAServer(rsaRouter);
new AESServer(aesRouter);

app.use('/rsa', rsaRouter);
app.use('/aes', aesRouter);
app.use(express.static('public'));

chatServer.listen(app.listen(80));
