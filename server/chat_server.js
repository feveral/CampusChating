var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');
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
        text: encrytMessage(0, nickNames[socket.id] + ' has joined ' + room + '.')
    });

    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (var index in usersInRoom) 
        {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) 
            {
                if (index > 0) {
                usersInRoomSummary += ', ';
            }
            usersInRoomSummary += nickNames[userSocketId];
        }
    }
    usersInRoomSummary += '.';
    socket.emit('BroadCastmessage', {text:encrytMessage(0,usersInRoomSummary)});
  }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
            success: false,
            message: encrytMessage(0, 'Names cannot begin with "Guest".')
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
                    text:encrytMessage(0, previousName + ' is now known as ' + name + '.')
                });
            } 
            else 
            {
                socket.emit('nameResult', {
                success: false,
                message: encrytMessage(0, 'That name is already in use.')
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('BroadCastmessage', function (message) {
    	console.log("encrypt message:"+message.text);
    	message.text = decryptMessage(0, message.text);

        if(message.room != "Lobby" )
        {
            console.log(message.room);
            var userId = getKeyByValue(nickNames,message.room); 
            console.log(nickNames[socket.id]);
            console.log(nickNames);
            console.log(nickNames[userId]);
            console.log("ssss"+nickNames[socket.id]+':'+message.text);
            io.sockets.sockets[userId].emit('message',{
            	room:nickNames[socket.id],
            	toUser:userId,
            	text:encrytMessage(0, nickNames[socket.id]+':'+ message.text)
            });
        }
        else
        {
            socket.broadcast.to(message.room).emit('BroadCastmessage', {
            text:encrytMessage(0,nickNames[socket.id] + ': ' + message.text)
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

var aesjs = require('aes-js');
function decryptMessage(key, message){
	key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 將十六進位的資料轉回二進位
	var encryptedBytes = aesjs.utils.hex.toBytes(message);

	// 解密時要建立另一個 Counter 實體
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);

	// 將二進位資料轉換回文字
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	console.log(decryptedText);
	return decryptedText;
}

function encrytMessage(key, message){
	key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 將文字轉換為位元組
	var textBytes = aesjs.utils.utf8.toBytes(message);

	// Counter 可省略，若省略則從 1 開始
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);

	// 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	console.log(encryptedHex);
	return encryptedHex;
}