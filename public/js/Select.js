
function addRoom(messageRoom){

	ClickChat();
	// var notRepeat = true;
	// $( "#room-list div" ).each(function( index ) {
	// 	if (messageRoom == $( this ).text())
	// 	{
	// 		notRepeat = false;
	// 	}
	// });
	// if (notRepeat)
	// {
 //        $('#room-list').append(divAddIdContentElement(messageRoom));
 //        $('#add-room').val('');
 //        changeRoom(messageRoom);
 //    }
}

function changeRoom(messageRoom){
	if(messageRoom != $('#room').text()){
		$('#messages').empty();
		$('#room').text(messageRoom);
	}
}