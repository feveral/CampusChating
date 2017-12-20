class ExploreMember{

	constructor(){
		this.GetData(this.MemberToExplore);
	}

	GetData(callback){
		var apiUrl = "/member";
		AjaxGet(apiUrl,callback);
	}

	MemberToExplore(msg){
		var data = (JSON.parse(msg))['data'];
		$('#room-list').empty();
		for(var i = 0 ; i < data.length ; i++){
			$('#room-list').append('<div onclick="ClickRoom(this)">' + 
									divEscapedContentElement(data[i]['Name']) + 
									divEscapedContentElement(data[i]['Id']) +
									divEscapedContentElement("7:24 PM") +
									'</div>');
		}
	}
}
