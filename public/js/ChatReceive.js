
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
		PrintBroadcastMessage(message.text);
    	showWindows(message.text);
    });

	socket.on('message', function (message) {
		message.text = decryptMessage(message.text);
    	addRoom(message.room);
    	PrintMessage(message);
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

function PrintMessage(message){
	console.log("private!" + message.text);
	if(document.getElementById("room").textContent === message.room)
	{
		var image = '<div><img src="./image/question.jpg">'
		var newElement = $('<div></div></div>').text(message.text);
		$('#messages').append(image); 
   		$('#messages').append(newElement);  
	}
}

function PrintBroadcastMessage(messageText){
	console.log("public!" + messageText);
	if(document.getElementById("room").textContent === "Lobby")
	{
		var newElement = $('<div class="public"></div>').text(messageText);
   		$('#messages').append(newElement);  
	}
}