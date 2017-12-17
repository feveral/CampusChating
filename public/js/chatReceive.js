
var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);
	socket.emit('rooms');

	socket.on('nameResult', function(result) {
	    var message;

	    if (result.success) 
	    {
	    	message = 'You are now known as ' + result.name + '.';
	    } 
	    else 
	    {
	    	message = result.message;
	    }
	    $('#messages').append(divSystemContentElement(message));
	});

	socket.on('joinResult', function(result) {
    	$('#room').text(result.room);
    	$('#messages').append(divSystemContentElement('Room changed.'));
	});

	socket.on('BroadCastmessage', function (message) {
		message.text = message.text;
    	var newElement = $('<div></div>').text(message.text);
    	$('#messages').append(newElement);
    	showWindows(message.text);
    });

	socket.on('message', function (message) {
		message.text = message.text;
    	addRoom(message.room);
    	var newElement = $('<div></div>').text(message.text);
    	$('#messages').append(newElement);  
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
