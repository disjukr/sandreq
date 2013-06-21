var http = require('http');

var hostname = '0.0.0.0';
var port = 1234;

http.createServer(function (req, res) {
    var uri = decodeURIComponent(req.url.substr(1));
    var _writeHead = writeHead.bind(null, uri, res);
    var _res = res;
    if (uri.substr(0, 4) != 'http') {
        _writeHead(404, 'text/plain');
        _res.end('404');
    }
    else {
        http.get(uri, function (res) {
            _writeHead(res.statusCode,
                    res.headers['content-type'], 'asdf');
            res.pipe(_res);
        }).on('error', function (err) {
            _writeHead(404, 'text/plain');
            _res.end('404');
        });
    }
}).listen(port, hostname);

console.log('running on ' + hostname + ' port ' + port);

function writeHead(uri, res, statusCode, contentType) {
    res.writeHead(statusCode, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });

    console.log(uri + ' -> ' + statusCode + ', ' + contentType);
}