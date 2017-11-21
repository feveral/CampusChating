const http = require('http');
const fs = require('fs');
const url = require('url');
const io = require('socket.io');

server = http.createServer(function(req,res){
	res.end('123');


});


server.listen(80);
ioServer = io.listen(server);

ioServer.sockets.on('connection',function(socket){
	socket.emit('message',{'message':'hello world'});
})