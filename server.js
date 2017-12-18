var express = require('express');
var BodyParser = require('body-parser');
var chatServer = require('./server/chat_server.js');
var RSAServer = require('./server/RSAServer.js');
var AESServer = require('./server/AESServer.js');
var KeyServer = require('./server/KeyServer.js');

var app = express();

var rsaRouter = express.Router();
var aesRouter = express.Router();
var keyRouter = express.Router();

new RSAServer(rsaRouter);
new AESServer(aesRouter);
new KeyServer(keyRouter);

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use('/key', keyRouter);
app.use('/rsa', rsaRouter);
app.use('/aes', aesRouter);
app.use(express.static('public'));

chatServer.listen(app.listen(80));
