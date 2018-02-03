var io      = require('socket.io'),
    express = require('express');

var app    = express(),
    socket = io.listen(app),
    store  = new express.session.MemoryStore;
app.use(express.cookieParser());
app.use(express.session({ secret: 'something', store: store }));

app.get('/', function(req, res) {
  var old = req.session.email;
  req.session.email = req.param('email');

  res.header('Content-Type', 'text/plain');
  res.send("Email was '" + old + "', now is '" + req.session.email + "'.");
});

socket.on('connection', function(client) {
  // We declare that the first message contains the SID.
  // This is where we handle the first message.
  client.once('message', function(sid) {
    store.get(sid, function(err, session) {
      if (err || !session) {
        // Do some error handling, bail.
        return;
      }

      // Any messages following are your chat messages.
      client.on('message', function(message) {
        if (message.email === session.email) {
          socket.broadcast(message.text);
        }
      });
    });
  });
});

app.listen(4000);


function createRoomId(){
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return crypto.createHash('sha1').update(current_date + random).digest('hex');
}