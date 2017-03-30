var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

// this is the setup stuff for socket.io, it sets up the
var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('New connection');
	
	// the msg is basically the data of the source and target movement
	socket.on('move', function(msg){
		// the movement of player 1 will be broadcasted to player 2
		// keep in mind this broadcasts to everyone, so if there is 4 player, then all 4 player gets the broadcast
		socket.broadcast.emit('move', msg);
	});
});

http.listen(port, function(){
	console.log('Listening on port ' + port + '...');
});
