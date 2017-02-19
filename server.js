//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var raspId = '1';

io.on('connection', function (socket) {
    socket.on('operationProcessed', function (operation) {
        io.emit(raspId + "_notification", operation.deviceDetails);
    });

    socket.on('performOperation', function (data) {
        io.emit(raspId, { description: "post", deviceId: data.deviceId, isProcessed: false });
    });

    socket.on('getDevices', function (data) {
        io.emit(raspId, { description: "get", deviceId: "0", isProcessed: false });
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});