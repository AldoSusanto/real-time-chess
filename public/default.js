var socket = io();
// this just opens up the socket.io file

var initGame = function() {
	var cfg = {
		draggable: true,
		position: 'start',
		onDrop: handleMove,
	};
	
	board = new ChessBoard('gameBoard', cfg);
	game = new Chess();
};

var handleMove = function(source, target) {
	var move = game.move({from: source, to: target});
	
	if(move === null){
		console.log('Invalid move! Snapping back.');
		return 'snapback';
	}
	else{
		console.log('Valid move!');
		// now, when a move is valid, it will send a message that someone made a move
		// the second argument is basically a string of text made from the library, it shows the movement of the source and the target
		socket.emit('move', move);
	}
}

// this is the listener for the broadcast from the server.js
socket.on('move', function(msg) {
	game.move(msg);
	board.position(game.fen()); // this redraws the board and fen() is just their library
});

initGame();
