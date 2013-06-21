var http = require('http');
var request = require('request');

var hostname = '0.0.0.0';
var port = 1234;

http.createServer(function (req, res) {
    var uri = decodeURIComponent(req.url.substr(1));
    var _response = response.bind(null, uri, res);
    if (uri.substr(0, 4) != 'http') {
        _response(404, 'text/plain', '404');
    }
    else {
        request({uri: uri},
        function (err, res, content) {
            if (err)
                _response(404, 'text/plain', '404');
            else
                _response(res.statusCode,
                    res.headers['content-type'], content);
        });
    }
}).listen(port, hostname);

console.log('running on ' + hostname + ' port ' + port);

function response(uri, res, statusCode, contentType, content) {
    res.writeHead(statusCode, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });
    res.end(content);

    console.log(uri + ' -> ' + statusCode + ', ' + contentType);
}