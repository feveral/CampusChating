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
	    	if($('#room').text() == "大廳")
	    		chatApp.sendMessage("大廳", message, GetDateTime());
	    	else
	        	chatApp.sendMessage( $('#room>div').text(), message, GetDateTime());
	        PrintWhatYouEnter(chatApp,message,ProcessSendTime(GetDateTime()));
	        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
	    }
	}

    $('#send-message').val('');
}

function PrintWhatYouEnter(chatApp,message,time){


	AjaxGet('/member/' + chatApp.getNickName() , function(msg){
		var data = (JSON.parse(msg)['data']);
		var name = data['Name'];
		if($('#messages > div:last-child > div > div:nth-child(2)').text() === chatApp.getNickName())
		{
			$('#messages > div:last-child').append('<div>' + message + '</div>');
			return;
		}

	    $('#messages').append(
	    	'<div id="privateText">' + 
	    		'<div>' + 
			    	'<div>' + name + '</div>' + 
			    	'<div>' + chatApp.getNickName() + '</div>' + 
			    	'<div>' + time + '</div>' + 
			    '</div>' + 
		    	'<div>' + message + '</div>' + 	
			'</div>'
		);
	});
}

function PrintSavedMessage(message,time,lobbyPersonalMessage,name){
	var roomTitle = GetTitleString();
	if((roomTitle === message.room) || lobbyPersonalMessage)
	{
		var id = message.text.split(":")[0];
		var content = message.text.split(":")[1];
		if($('#messages > div:last-child > div > div:nth-child(2)').text() === id)
		{
			$('#messages > div:last-child').append('<div>' + content + '</div>');
			return;
		}
	    $('#messages').append(
	    	'<div id="privateText">' + 
	    		'<div>' + 
			    	'<div>' + name + '</div>' + 
			    	'<div>' + id + '</div>' + 
			    	'<div>' + time + '</div>' + 
			    '</div>' + 
		    	'<div>' + content + '</div>' + 	
			'</div>'
		);
		$("#messages").animate({ scrollTop: 3000 }, 1);
	}
}

function PrintReceiveMessage(message,time,lobbyPersonalMessage,name){
	var roomTitle = GetTitleString();
	if((roomTitle === message.room) || lobbyPersonalMessage)
	{
		var id = message.text.split(":")[0];
		var content = message.text.split(":")[1];

		AjaxGet('/member/' + id , function(msg){
			var data = (JSON.parse(msg)['data']);
			var name = data['Name'];
			if($('#messages > div:last-child > div > div:nth-child(2)').text() === id)
			{
				$('#messages > div:last-child').append('<div>' + content + '</div>');
				return;
			}
		    $('#messages').append(
		    	'<div id="privateText">' + 
		    		'<div>' + 
				    	'<div>' + name + '</div>' + 
				    	'<div>' + id + '</div>' + 
				    	'<div>' + time + '</div>' + 
				    '</div>' + 
			    	'<div>' + content + '</div>' + 	
				'</div>'
			);
			$("#messages").animate({ scrollTop: 3000 }, 1);
		});
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
		     var next = divs[i + 1];
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

