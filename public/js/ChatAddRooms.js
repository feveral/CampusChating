function divEscapedContentElement(message) {
    return '<div>' + message + '</div>';
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

function divAddIdContentElement(message) {
    return '<div onclick="ClickRoom(this)">' + message +'</div>';
}

function ClickRoom(room){
    $("#room-list > div").css("background-color", "white");
    $("#room-list > div").css("color", "black");
    $(room).css("background-color","#5d8db3");
    $(room).css("color","white");
    $('#messages').empty();
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;

    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) 
        {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } 
    else 
    {
        chatApp.sendMessage( $('#room').text(), message);
        PrintWhatYouEnter(chatApp,message);
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

    $('#send-message').val('');
}

function PrintWhatYouEnter(chatApp,message){
    $('#messages').append('<div class="privateText">' + 
    	divEscapedContentElement(chatApp.getNickName()) + 
    	divEscapedContentElement(message) + 
    	'</div>');
}

function PrintReceiveMessage(message,lobbyPersonalMessage){
	if((document.getElementById("room").textContent === message.room) || lobbyPersonalMessage)
	{
		var name = message.text.split(":")[0];
		var content = message.text.split(":")[1];
		$('#messages').append('<div class="privateText">' + 
		divEscapedContentElement(name) + 
		divEscapedContentElement(content) + 
		'</div>');
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
