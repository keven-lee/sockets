var socket = io();
//in console Connected to socket.io server
socket.on('connect', function() {
    console.log('Connected to socket.io server');
});
// prints New Message
// then message.text from sender's socket.emit('message', {
//        text: 'hi!'
//    });
socket.on('message', function(message) {
    
    console.log('New Message');
    console.log(message.text);
    
    jQuery('.messages').append('<p>'+message.text+'</p>')
});

//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();

    var $message = $form.find('input[name=message]');
    
    socket.emit('message', {
        text: $message.val()
    });
    
    $message.val('');
});