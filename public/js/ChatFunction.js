var Chat = function(socket) {
    this.socket = socket;
    this.nick = "";
};

Chat.prototype.sendMessage = function(room, text) {
    var message = {
        room: room,
        text: encryptManager.AESEncrypt( text )
    };
    if(room == "大廳")
        message['text'] = text;
    this.socket.emit('BroadCastmessage', message);
};


Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', {
        newRoom: room
    });
};

Chat.prototype.getNickName = function() {
	return this.nick;
};

Chat.prototype.setNickName = function(nick) {
	this.nick = nick;
};

Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var command = words[0]
                .substring(1, words[0].length)
                .toLowerCase();
    var message = false;

    switch(command) {
    	case 'join':
	        words.shift();
	        var room = words.join(' ');
	        this.changeRoom(room);
	        break;
    	case 'nick':
	        words.shift();
	        var name = words.join(' ');
	        this.socket.emit('nameAttempt', name);
	        this.nick = name;
	        break;
    	default:
	        message = 'Unrecognized command.';
	        break;
    };

    return message;
};
