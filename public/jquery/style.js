// function styler(){
// 		console.log("blue");

// 	$(document).ready(function(this) {
// 		$(this).css('background-color', 'red');
// 		console.log("blue");
// 		// $("#room-list").css("background-color", "white");
// 	 //    $("#room-list div").css("background-color", "rgb(86, 176, 234)");
// 	    $('#messages').empty();
//     	console.log(x);
// 		$('#room').text($(this));
//     });
// }

$(document).ready(function(){
    $('#room-list').click(function(e){
        var txt = $(e.target).text();
  		$('#room').text(txt);
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

