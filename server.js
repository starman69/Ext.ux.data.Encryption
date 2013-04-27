var express = require('express');
var server = express();

server.configure(function(){
    server.use(express.static(__dirname + '/public'));
});

server.get('/hello', function (req, res) {
    res.send('Hello World');
});

server.listen(8080);