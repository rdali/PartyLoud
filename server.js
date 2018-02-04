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

const secret = "xcbKxz3cDs0DEz26O2Mz"

var activeRooms = [];
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

app.use(cookieParser(secret))


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use('/', express.static(path.join(__dirname, 'webpage/home')))
app.use('/', express.static(path.join(__dirname, 'webpage/room')))

app.get('/reset', (req, res) => {
    res.clearCookie("roomid");
    // res.clearCookie("roomid");

    res.redirect("/")
})

app.get('/create', setCookie,
    (req, res) => {
        var roomid = req.cookies.roomid || req.params.roomid;
        res.redirect('/room?id=' + roomid);
    });

app.get('/room', (req, res)=>{
	res.sendFile(path.join(__dirname, 'webpage/room/index.html'));
});

app.get('/run', (req, res)=>{
	let requests = activeRooms.reduce((promiseChain, room)=>{
		return promiseChain.then(()=> new Promise ((resolve)=>
			{
				console.log('audio message ' + room);
				io.emit('audio message ' + room, {command: "play"});
			}));
	}, Promise.resolve());
	requests.then(()=> {res.end("sent");});
})


io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        
        // socket.broadcast.emit(msg);
    });

    //user is active
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});


function getCookie(req, res, next) {
    if (req.cookies && req.cookies.id_token) {
        console.log(req.cookies.id_token)
    }
    next();
}

function setCookie(req, res, next) {
    // check if client sent cookie
    var cookieVal = req.cookies.roomid;
    if (cookieVal === undefined) {
        cookieVal = uuidv4();
        res.cookie('roomid', cookieVal, { maxAge: 900000, httpOnly: true })
    } else {
        console.log("this guy already has a cookie : " + cookieVal)
    }
    req.params.roomid=cookieVal;
    activeRooms.pushIfNotExist(cookieVal, (other)=>{
    	return other === cookieVal;
    });

    next();
}





http.listen(3000, function() {
    console.log('listening on *:3000');
});

// https://stackoverflow.com/questions/1988349/array-push-if-does-not-exist
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 