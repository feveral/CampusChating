class ExploreMember{

	constructor(){
		this.GetData(this.MemberToExplore);
	}

	GetData(callback){
		var apiUrl = "/member";
		AjaxGet(apiUrl,callback);
	}

	MemberToExplore(msg){
		var data = (JSON.parse(msg));
		var message = JSON.parse(encryptManager.AESDecrypt(data['data']));
		$('#room-list').empty();
		for(var i = 0 ; i < message.length ; i++){
			$('#room-list').append('<div onclick="ClickRoom(this)">' +
									'<div>' + 
									divEscapedContentElement(message[i]['Name']) + 
									divEscapedContentElement(message[i]['Id']) +
									'</div>' + 
									'</div>');
			$('#room-list>div').css("line-height","55px");
		}
	}
}
