//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', { reconnect: true });

var deviceDetails = { description: "get", deviceId: "0", isProcessed: true };

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('1', function (operation) {
    socket.emit('operationProcessed',
        {
            'deviceId': operation.deviceId,
            'description': operation.description,
            'deviceDetails': deviceDetails,
            'status': 'success'
        });
});