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
			$('#room-list').append(RoomHtml(data[i]['Id']));
		}
	}
}

function RoomHtml(data){
	return '<div onclick="ClickRoom(this)">' + data + '</div>';
}