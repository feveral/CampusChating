
var socket = io.connect();

$(document).ready(function() {
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
	    	message = decryptMessage(result.message);
	    }
	    PrintBroadcastMessage(message);
	});

	socket.on('joinResult', function(result) {
    	$('#room').text(result.room);
    	var message = 'Room changed.';
    	PrintBroadcastMessage(message);
	});

	socket.on('BroadCastmessage', function (message) {
		message.text = decryptMessage(message.text);
		IsBroadcastPersonal(message);
		console.log(message.text);
    	showWindows(message.text);
    });

	socket.on('message', function (message) {
		message.text = decryptMessage(message.text);
    	addRoom(message.room);
    	console.log(message);
    	PrintReceiveMessage(message);
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

