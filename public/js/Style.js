$(document).ready(function(){
    $('#room-list').click(function(e){
    	$("#room-list div").css("background-color", "white");
    	$("#room-list ").css("background-color", "white");
    	$("#room-list div").css("color", "black");
    	$(e.target).css("background-color","#5682a3 ");
    	$(e.target).css("color","white");
  		$('#room').text($(e.target).text());
  		$('#messages').empty();
    });
});


function showWindows(notifyMessage){
	$('#notify').text(notifyMessage);
	document.getElementById("jumpWindow").style.height = "4%";
	setTimeout(function(){
		document.getElementById("jumpWindow").style.height = "0%";
	}, 2000);
}


