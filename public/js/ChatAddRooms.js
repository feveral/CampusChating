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
    $('#room').text($(room).text());
    GetMessageFromServer($(room).text());
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

function GetDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
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

function GetMessageFromServer(chatPeople){
	var apiUrl = "/message/" + chatPeople;
	var callback = function(msg){
		var object = JSON.parse(msg);
		var message = object['data'];
		for(var Count in message){
			message[Count]['text'] = message[Count]['SenderId'] + ":" + message[Count]['Message'];
			PrintReceiveMessage(message[Count],ProcessReceiveTime(message[Count]['Time']),true);
		}
	}
	AjaxGet(apiUrl,callback);
}

function ProcessReceiveTime(wholeTime){
	var pmOram = "AM";
	var noDate = wholeTime.split("T")[1];
	var hour = IsOverDay(parseInt(noDate.split(":")[0]) + 8);
	var minute = noDate.split(":")[1];
	var second = noDate.split(":")[2].split(".")[0];
	if(IsPm(hour))
	{
		hour = hour - 12;
		pmOram = "PM";
	}
	var time = hour + ":" + minute + ":" + second + pmOram;
	return time;
}


function ProcessSendTime(wholeTime){
	var pmOram = "AM";
	var noDate = wholeTime.split(" ")[1];
	var hour = noDate.split(":")[0];
	var minute = noDate.split(":")[1];
	var second = noDate.split(":")[2];

	if(IsPm)
	{
		hour = hour -12;
		pmOram = "PM";
	}
	var time = hour + ":" + minute + ":" + second + pmOram;
	return time;
}

function IsOverDay(hour){
	if(hour >= 24)
		hour = hour - 24;
	return hour;
}

function IsPm(hour){
	var boolPm = false;
	if(hour >= 13 && hour <= 24)
		boolPm = true;
	return boolPm;
}