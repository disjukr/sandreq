var http = require('http');
var request = require('request');
var stream = require ("stream");

var hostname = '0.0.0.0';
var port = 1234;

http.createServer(function (req, res) {
    var uri = decodeURIComponent(req.url.substr(1));
    var _response = response.bind(null, uri, res);
    if (uri.substr(0, 4) != 'http') {
        _response(404, 'text/plain', '404');
    }
    else {
        request(uri,
        function (err, res, body) {
            if (err)
                _response(404, 'text/plain', '404');
            else
                _response(res.statusCode,
                    res.headers['content-type'], body);
        });
    }
}).listen(port, hostname);

console.log('running on ' + hostname + ' port ' + port);

function response(uri, res, statusCode, contentType, body) {
    var contentStream = new stream.Readable();
    var offset = 0;
    contentStream._read = function (size) {
        while (size--) {
            contentStream.push(body[offset++]);
            if (offset > body.length)
                return;
        }
    }
    res.writeHead(statusCode, {
        'Content-Type': contentType,
        'Content-Length': body.length,
        'Access-Control-Allow-Origin': '*'
    });
    contentStream.pipe(res);

    console.log(uri + ' -> ' + statusCode + ', ' + contentType);
}