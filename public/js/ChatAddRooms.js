function divEscapedContentElement(message) {
    return '<div>' + message + '</div>';
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

function divAddIdContentElement(message) {
    return '<div onclick="ClickRoom(this)">' + message +'</div>';
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;
    if(message != '')
    {
	    if (message.charAt(0) == '/') {
	        systemMessage = chatApp.processCommand(message);
	        if (systemMessage) 
	        {
	            $('#messages').append(divSystemContentElement(systemMessage));
	        }
	    } 
	    else 
	    {
	        chatApp.sendMessage( $('#room').text(), message, GetDateTime());
	        PrintWhatYouEnter(chatApp,message,ProcessSendTime(GetDateTime()));
	        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
	    }
	}

    $('#send-message').val('');
}

function PrintWhatYouEnter(chatApp,message,time){
    $('#messages').append('<div class="privateText">' + 
    	'<div>'+ 
    	divEscapedContentElement(chatApp.getNickName()) + 
    	divEscapedContentElement(message) + 
    	'</div>' + 
		'<div class="time">' + 
		divEscapedContentElement(time) + 
		'</div></div>');
}

function PrintReceiveMessage(message,time,lobbyPersonalMessage){
	if((document.getElementById("room").textContent === message.room) || lobbyPersonalMessage)
	{
		var name = message.text.split(":")[0];
		var content = message.text.split(":")[1];
		$('#messages').append('<div class="privateText">' +
		'<div>' + 
		divEscapedContentElement(name) + 
		divEscapedContentElement(content) + 
		'</div>' + 
		'<div class="time">' + 
		divEscapedContentElement(time) + 
		'</div></div>');
	}
}

function PrintBroadcastMessage(message){
	if(document.getElementById("room").textContent === "大廳")
	{	
		var newElement = $('<div class="public"></div>').text(message);
		$('#messages').append(newElement);
	}
}

//determine if person speak in room or system speak
function IsBroadcastPersonal(message){
	if(document.getElementById("room").textContent === "大廳")
	{
		if(message.system)
			PrintBroadcastMessage(message.text);
		else
			PrintReceiveMessage(message,true);
	}
}

