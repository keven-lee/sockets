var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};
//User connected
io.on('connection', function(socket) {
       console.log('USer connected to socket.io');
    
       socket.on('disconnect', function() { 
           var userData = clientInfo[socket.id];
           if (typeof userData !== 'undefined'){
           socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete userData;
               
               
       }
    
       });
    
       socket.on('joinRoom', function(req) {
       clientInfo[socket.id] = req;
       socket.join(req.room); 
       socket.broadcast.to(req.room).emit('message', {
           name: 'System',
           text: req.name + ' has joined!',
           timestamp: moment().valueOf()
       });
    });
    
    
    //listens to event, once activated console.logs to cmd
    socket.on('message', function(message){
        console.log('Message received ' + message.text);
     
        
        message.timestamp = moment().valueOf();
        //sends to eveyone but the person who sent it
        
        io.to(clientInfo[socket.id].room).emit('message', message);
    });
    //timestamp preoperty - JS in milliseconds
    
    
    //piece of info to send
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
        
    });
});

//Server started
http.listen(PORT, function (){
console.log('Server started');
} );