function divEscapedContentElement(message) {
    return $('<div class="user"></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

function divAddIdContentElement(message) {
    return '<div>' + message +'</div>';
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;

    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) 
        {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } 
    else 
    {
        chatApp.sendMessage( $('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

    $('#send-message').val('');
}
