var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('operationProcessed', function (operation) {
        
        if (operation.description == "post") {
            io.emit("deviceListFetched", operation.deviceDetails[0]);
        }
        else if (operation.description == "get") {
            io.emit("onDeviceUpdated", operation.deviceDetails);
        }
    });

    socket.on('performOperation', function (data) {
        io.emit("processRecord", { raspId: data.raspId, description: "post", deviceId: data.deviceId, isProcessed: false });
    });

    socket.on('getDevices', function (raspId) {
        io.emit("processRecord", { raspId: raspId, description: "get", deviceId: "0", isProcessed: false });
    });
});

startUp();

//Listen for all the request
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('Server running on port ' + port);
});

server.timeout = 300000;

//Register all the startup related stuffs in this function
function startUp() {
    var options = {
        index: "index.htm"
    };

    app.use('/', express.static('public', options));
    var port = process.env.PORT || 9000;
    app.set('port', port);
}