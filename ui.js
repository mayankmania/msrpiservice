//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', { reconnect: true });

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('1_notification', function (data) {
    console.log(data);
});

socket.emit('getDevices','1');