
function showWindows(notifyMessage){
	$('#notify').text(notifyMessage);
	document.getElementById("jumpWindow").style.height = "4%";
	setTimeout(function(){
		document.getElementById("jumpWindow").style.height = "0%";
	}, 2000);
}


