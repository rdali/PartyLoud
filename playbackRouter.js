var express = require('express')
var playbackApi = express.Router();


io.on('connection', function(socket) {
    console.log('a user connected');

    //user is active
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});


////////////////////////////////////
/////MP3 APIs
////////////////////////////////////
////////////////////////////////////
app.get('/play', (req, res)=>{
	console.log(activeRooms)
	let requests = activeRooms.reduce((promiseChain, room)=>{
		return promiseChain.then(()=> new Promise ((resolve)=>
			{
				console.log('audio message ' + room);
				io.emit('audio message ' + room, {command: "play"});
			}));
	}, Promise.resolve());
	requests.then(()=> {res.end("sent play");});
})
app.get('/pause', (req, res)=>{
	console.log(activeRooms)

	let requests = activeRooms.reduce((promiseChain, room)=>{
		return promiseChain.then(()=> new Promise ((resolve)=>
			{
				console.log('audio message ' + room);
				io.emit('audio message ' + room, {command: "pause"});
			}));
	}, Promise.resolve());
	requests.then(()=> {res.end("sent pause");});
})
app.get('/reset', (req, res)=>{
	console.log(activeRooms)
	let requests = activeRooms.reduce((promiseChain, room)=>{
		return promiseChain.then(()=> new Promise ((resolve)=>
			{
				console.log('audio message ' + room);
				io.emit('audio message ' + room, {command: "reset"});
			}));
	}, Promise.resolve());
	requests.then(()=> {res.end("sent reset");});
})

module.exports = playbackApi