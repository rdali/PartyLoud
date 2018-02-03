var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//for sessions
// var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');
var session = require('express-session');



// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

app.use(cookieParser("cookie secret"))


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.get('/create', (req, res)=>{
	var randomRoom = uuidv4();
	console.log(randomRoom)
	res.end(randomRoom)
})

app.use('/', express.static(path.join(__dirname ,'webpage/home')))
app.use('/room', express.static(path.join(__dirname ,'webpage/room')))


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