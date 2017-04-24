var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');
var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function(req, res) {
    var filePath = extract(req.url);
    fs.readFile(filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            var contentType = mime.lookup(filePath);
            console.log('contentType ' + contentType);
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }
    });
});
server.listen(3000);
