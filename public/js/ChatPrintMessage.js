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
    	if($('#room').text() == "大廳")
    		chatApp.sendMessage("大廳", message, GetDateTime());
    	else
        	chatApp.sendMessage( $('#roomId').text(), message, GetDateTime());
        PrintWhatYouEnter(chatApp,message,ProcessSendTime(GetDateTime()));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
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
	var roomTitle = GetTitleString();
	console.log("aaa" + roomTitle);
	if((roomTitle === message.room) || lobbyPersonalMessage)
	{
		console.log("ccc");
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
		$("#messages").animate({ scrollTop: 3000 }, 1);
	}
}

function GetTitleString()
{
	var divs = document.getElementsByTagName("div");
	var x = document.getElementById("room");
	for(var i = 0; i < divs.length;i++)
	{
		   	if(divs[i] == x)
		   {
		     var previous = divs[i - 1];
		     console.log(previous);
		     var next = divs[i + 1];
		     console.log(next.textContent);
		   }
	}
	return next.textContent;
}

function PrintBroadcastMessage(message){
	console.log(document.getElementById("room").textContent);
	if(document.getElementById("room").textContent === "大廳")
	{	
		console.log("checkit");
		var newElement = $('<div class="public"></div>').text(message);
		$('#messages').append(newElement);
		console.log("checkit");
	}
}

//determine if person speak in room or system speak
function IsBroadcastPersonal(message){
	if(document.getElementById("room").textContent === "大廳")
	{
		console.log("kk"+ message.time);
		if(message.system)
			PrintBroadcastMessage(message.text);
		else
			PrintReceiveMessage(message,ProcessSendTime(message.time),true);
	}
}

