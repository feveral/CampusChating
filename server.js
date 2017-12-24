var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var chatServer = require('./server/chat_server.js');
var KeyServer = require('./server/KeyServer.js');
var KeyCenter = require('./server/KeyCenter.js');
var LoginServer = require('./server/LoginServer.js');
var MessageServer = require('./server/MessageServer.js');
var MemberServer = require('./server/MemberServer.js');
var ContactServer = require('./server/ContactServer.js');


var app = express();

var keyRouter = express.Router();
var loginRouter = express.Router();
var messageRouter = express.Router();
var memberRouter = express.Router();
var contactRouter = express.Router();

var keyCenter = new KeyCenter();
new KeyServer(keyCenter,keyRouter);
new LoginServer(app,loginRouter);
new MessageServer(messageRouter,keyCenter);
new MemberServer(memberRouter,keyCenter);
new ContactServer(contactRouter,keyCenter);

app.use('/login', loginRouter);
app.use('/member', memberRouter);
app.use('/key', keyRouter);
app.use('/message', messageRouter);
app.use('/contact', contactRouter);
app.use(express.static('public'));

chatServer.SetKeyCenter(keyCenter);
chatServer.listen(app.listen(80));
