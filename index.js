var fs = require('fs');
var http = require('http');
var url = require('url');
var port = 3000;

function requestHandler(request, response) {
    var query = url.parse(request.url, true).query;

    if (query && query.celsius) {
        var celsius = Number(query.celsius);
        var fahrenheit = celsius*9/5+32;
        var resultContent = fs.readFileSync('html/result.html', 'utf-8');
        resultContent = resultContent.replace('@celsius@', celsius);
        resultContent = resultContent.replace('@fahrenheit@', fahrenheit);
        var log = query.whoami + ' ' + celsius + '\n';
        fs.appendFileSync('./visitors.log', log);
        response.end(resultContent, );
    } else if (request.url == '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
    } else {
        var indexContent = fs.readFileSync('html/index.html', 'utf-8');
        response.end(indexContent);
    }
}

var server = http.createServer(requestHandler);

server.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
