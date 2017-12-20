class ChatMember{

	constructor(){
		this.GetData(this.MemberToChat);
	}

	GetData(callback){
		var apiUrl = "/contact";
		AjaxGet(apiUrl,callback);
	}

	MemberToChat(msg){
		var data = (JSON.parse(msg))['data'];
		$('#room-list').empty();
		for(var i = 0 ; i < data.length ; i++){
			$('#room-list').append('<div onclick="ClickRoom(this)">' +
									'<div>' + 
									divEscapedContentElement(data[i]['Name']) + 
									divEscapedContentElement(data[i]['ContactId']) +
									divEscapedContentElement(ProcessReceiveTime(data[i]['Time'])) +
									'</div>' + 
									'<div class="NewestMessage">' + 
									divEscapedContentElement(data[i]['LastMessage']) +
									'</div>' + 
									'</div>');
		}
	}
}
