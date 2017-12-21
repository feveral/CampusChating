var socketio = require('socket.io');
var passport = require('passport');
var passportSocketIo = require('passport.socketio');
var cookieParser = require('cookie-parser');
var AESManager = require('./AESManager.js');
var MessageManager = require('./MessageManager.js');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
var keyList = [];

var aesManager = new AESManager();
var messageManager = new MessageManager();
var DatabaseUtility = require('../database/DatabaseUtility.js');
var keyCenter;

exports.SetKeyCenter = function(kc){
    keyCenter = kc;
}

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, '大廳');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms', function() {
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('BroadCastmessage', {
    	system: true,
        text:  ( nickNames[socket.id] + ' has joined ' + room + '.' )
    });

    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (var index in usersInRoom) 
        {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) 
            {
                if (index > 0) 
                {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('BroadCastmessage', {
        	system: true,
        	text: usersInRoomSummary
        });
    }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
	            success: false,
	            message: 'Names cannot begin with "Guest".'
            });
        } 
        else 
        {
            if (namesUsed.indexOf(name) == -1) 
            {
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('BroadCastmessage', {
                	system: true,
                    text: (previousName + ' is now known as ' + name + '.')
                });
            } 
            else 
            {
                socket.emit('nameResult', {
                success: false,
                message: keyCenter.GetAesManagerByMemberId(nickNames[socket.id]).Encrypt('That name is already in use.')
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('BroadCastmessage', function (message) {
    	var userId = getKeyByValue(nickNames,message.room); 
        if(message.room != "大廳" )
        {
        	message.text = keyCenter.GetAesManagerByMemberId(nickNames[socket.id]).Decrypt(message.text);
        	messageManager.AddMessage(
        		{
					SenderId: nickNames[socket.id],
					Message: message.text,
					ReceiverId: message.room,
					Time: message.time
				},
				function(err,result){}
			);

			if(io.sockets.sockets[userId] != undefined && nickNames[socket.id] != message.room){
	            io.sockets.sockets[userId].emit('message',{
	            	room: nickNames[socket.id],
	            	toUser: userId,
	            	text: keyCenter.GetAesManagerByMemberId(message.room).Encrypt(nickNames[socket.id]+':'+ message.text),
	            	time: message.time
	            });
        	}
        }
        else
        {
            socket.broadcast.to(message.room).emit('BroadCastmessage', {
            	system: false,
                text: (nickNames[socket.id] + ': ' + message.text),
                time: message.time
            });
        }
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);

}

