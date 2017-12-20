
function ClickExplore(){
	var exploreMember = new ExploreMember();
}

function ClickRoom(room){
    $("#room-list > div").css("background-color", "white");
    $("#room-list > div").css("color", "black");
    $(room).css("background-color","#5d8db3");
    $(room).css("color","white");
    $('#messages').empty();
    $('#room').text($(room).children().first().text());
    var Id = $(room).children().first().next().text();
    addIdOnTitle(Id);
    GetMessageFromServer(Id);
    $("#messages").animate({ scrollTop: 3000 }, 1);
}

function addIdOnTitle(Id){
	$('#room').append(divEscapedContentElement(Id));
}

