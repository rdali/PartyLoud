var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname ,'webpage')))


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
   	io.emit('chat message', msg);
  		// socket.broadcast.emit(msg);
  });

  //user is active
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});