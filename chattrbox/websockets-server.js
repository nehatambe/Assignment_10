var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];

ws.on('connection', function(socket) {
    messages.forEach(function(msg) {
        socket.send(msg);
    });
    socket.on('message', function(data) {
        messages.push(data);
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data);
        });
    });
});
