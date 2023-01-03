const http = require('http')
const fs = require('fs')
const port = 3000

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}
const urlsAvailable = walk("./guts/").map(filePath => filePath.substring(7, filePath.length))


const server = http.createServer(function(req, res){
//    console.log(req.url)
//    console.log(urlsAvailable)
    if (urlsAvailable.includes(req.url)) {
        res.writeHead(200)
        fs.readFile('guts' + req.url, function(error, data){
            if(error){
                res.writeHead(400)
                res.write('Error: File Not Found')
            } else{
                res.write(data)
            }
            res.end()
        })
    } else {
        res.write("404 - Not Found");
        res.end()
    }
})

server.listen(port, function(error){
    if(error){
        console.log('somethings gone wrong', error)
    } else{
        console.log('server is listening on port ' + port)
    }
})