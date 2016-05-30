var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//User connected
io.on('connection', function(socket) {
       console.log('USer connected to socket.io');
    //listens to event, once activated console.logs to cmd
    socket.on('message', function(message){
        console.log('Message received ' + message.text);
     
        //sends to eveyone but the person who sent it
        io.emit('message', message);
    });
    //timestamp preoperty - JS in milliseconds
    
    
    //piece of info to send
    socket.emit('message', {
        text: 'Welcome to the chat application!'
        
    });
});

//Server started
http.listen(PORT, function (){
console.log('Server started');
} );