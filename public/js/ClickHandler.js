
function ClickExplore(){
	var exploreMember = new ExploreMember();
}

function ClickChat(){
	var chatMember = new ChatMember();
}

function ClickRoom(room){
    $("#room-list > div").css("background-color", "white");
    $("#room-list > div").css("color", "black");
    $(room).css("background-color","#5d8db3");
    $(room).css("color","white");
    $('#messages').empty();
    var Name = $(room).find("div:nth(1)").text();
    $('#room').text(Name);
    var Id = $(room).find("div:nth(2)").text();
    $('#roomId').text(Id);
    GetMessageFromServer(Id);
    $("#messages").animate({ scrollTop: 3000 }, 1);
}





