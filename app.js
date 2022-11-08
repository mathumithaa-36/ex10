var http = require('http');
const fs = require('fs');
const server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.createReadStream('./node.html').pipe(res);
    } else if (req.url === '/server' && req.method == 'POST') {
        var rawData = '';
        req.on('data', function(data) {
            rawData += data;
        })
        req.on('end', function() {
            var inputdata = new URLSearchParams(rawData);
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
        
            res.write('<table color="blue" border=1 cellspacing=0 align="center"><tr><th>Field Name</th><th>Value</th></tr>')
            res.write('<tr><td>"Name"</td><td>' + inputdata.get('name') + '</td></tr>')
            res.write('<tr><td>"password"</td><td>' + inputdata.get('pass') + '</td></tr>')
            res.write('<tr><td>"Age"</td><td>' + inputdata.get('age') + '</td></tr>')
            res.write('<tr><td>"Mobile number"</td><td>' + inputdata.get('mobile') + '</td></tr>')
            res.write('<tr><td>"Email"</td><td>' + inputdata.get('email') + '</td></tr>')
            res.write('<tr><td>"Gender"</td><td>' + inputdata.get('gender') + '</td></tr>')
            res.write('<tr><td>"State"</td><td>' + inputdata.get('State') + '</td></tr></table>')
            //res.write('<tr><td>"Skill"</td><td>' +  + '</td></tr>')

            res.end();
        });
    }
});
server.listen(2000, function() {
    console.log('listening at 2000')
});