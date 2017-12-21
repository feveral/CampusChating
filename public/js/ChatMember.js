class ChatMember{

	constructor(){
		this.GetData(this.MemberToChat);
	}

	GetData(callback){
		var apiUrl = "/contact";
		AjaxGet(apiUrl,callback);
	}

	MemberToChat(msg){
		var data = (JSON.parse(msg));
		var message = JSON.parse(encryptManager.AESDecrypt(data['data']));
		$('#room-list').empty();
		for(var i = 0 ; i < message.length ; i++){
			$('#room-list').append('<div onclick="ClickRoom(this)">' +
									'<div>' + 
									divEscapedContentElement(message[i]['Name']) + 
									divEscapedContentElement(message[i]['ContactId']) +
									divEscapedContentElement(ProcessReceiveTime(message[i]['Time'])) +
									'</div>' + 
									'<div class="NewestMessage">' + 
									divEscapedContentElement(message[i]['LastMessage']) +
									'</div>' + 
									'</div>');
		}
	}
}
