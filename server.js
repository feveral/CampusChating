var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var BodyParser = require('body-parser');
var chatServer = require('./server/chat_server.js');
var KeyServer = require('./server/KeyServer.js');
var KeyCenter = require('./server/KeyCenter.js');
var LoginServer = require('./server/LoginServer.js');

var app = express();

var keyRouter = express.Router();
var loginRouter = express.Router();

var keyCenter = new KeyCenter();
new KeyServer(keyCenter,keyRouter);
new LoginServer(app,loginRouter);

// app.use(BodyParser.urlencoded({ extended: false }));
// app.use(BodyParser.json());
app.use('/login', loginRouter);
app.use('/key', keyRouter);
app.use(express.static('public'));

chatServer.SetKeyCenter(keyCenter);
chatServer.listen(app.listen(80));
