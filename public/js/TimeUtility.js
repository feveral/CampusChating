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

function GetMessageFromServer(chatPeople){
	var apiUrl = "/message/" + chatPeople;
	var callback = function(msg){
		var object = JSON.parse(msg);
		var message = object['data'];
		for(var Count in message)
		{
			message[Count]['text'] = message[Count]['SenderId'] + ":" + message[Count]['Message'];
			PrintSavedMessage(message[Count],ProcessReceiveTime(message[Count]['Time']),true,message[Count]['Name']);
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
	var time = hour + ":" + minute + ":" + second +" "+  pmOram;
	return time;
}


function ProcessSendTime(wholeTime){
	var pmOram = "AM";
	var noDate = wholeTime.split(" ")[1];
	var hour = noDate.split(":")[0];
	var minute = noDate.split(":")[1];
	var second = noDate.split(":")[2];
	if(IsPm(hour))
	{
		hour = hour -12;
		pmOram = "PM";
	}
	var time = hour + ":" + minute + ":" + second +" "+ pmOram;
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