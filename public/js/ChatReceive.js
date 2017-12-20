
var socket = io.connect();

$(document).ready(function() {
	encryptManager = new EncryptManager();

	socket.emit('rooms');

	socket.on('nameResult', function(result) {
	    var message;
	    if (result.success) 
	    {
	    	message = 'You are now known as ' + result.name + '.';
	    	chatApp.setNickName(result.name);
	    } 
	    else 
	    {
	    	message = encryptManager.AESDecrypt(result.message);
	    }
	    PrintBroadcastMessage(message);
	});

	socket.on('joinResult', function(result) {
    	$('#room').text(result.room);
    	var message = 'Room changed.';
    	PrintBroadcastMessage(message);
	});

	socket.on('BroadCastmessage', function (message) {
		message.text = message.text;
		console.log(message.text);
		IsBroadcastPersonal(message);
    	showWindows(message.text);
    });

	socket.on('message', function (message) {
		message.text = encryptManager.AESDecrypt(message.text);
    	addRoom(message.room);
    	PrintReceiveMessage(message,ProcessSendTime(message.time),false);
	});

    $('#send-message').focus();

	socket.on('rooms', function(rooms) {
		for(var room in rooms) 
    	{
    		room = room.substring(1, room.length);
    		if (room != '') 
    		{
    			$('#room-list').append(divAddIdContentElement(room));
    		}
    	}

    	$('#room-list div').click(function() {
    		chatApp.processCommand('/join ' + $(this).text());
    		$('#send-message').focus();
    	});
	});
});

