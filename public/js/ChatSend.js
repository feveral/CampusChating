var chatApp = new Chat(socket);
$(document).ready(function() {
        ChangeName();
        $('#send-form').submit(function() {
        processUserInput(chatApp, socket);
        return false;
  	});

    $('#add-room-form').submit(function() {
        var message = $('#add-room').val();
        addRoom(message);
        return false;
    });
});