var app = require('express')()

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3001);

app.get('/', function (request, response) {
    // response.send('Hello World');
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
   // console.log('A connection was made.');
    socket.on('chat.message', function (message) {
        // console.log('New Message: ' + message);
        io.emit('chat.message', message);
    })
    
    socket.on('disconnect', function () {
        io.emit('chat.message', 'User has disconnected.');
    })
});