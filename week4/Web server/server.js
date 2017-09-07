const http = require('http');
const fs = require('fs');
const handles = require("../BE-first_web_server/tweetinfo/handles")
const path = require("path")
const infoPath = "../BE-first_web_server/tweetinfo"
const url = require("url")

var userdata = "../BE-first_web_server/tweetinfo/users/"
const server = http.createServer(function (request, response) {
    //console.log(request.method);
    //console.log(request.url);
var queryArr = ["count"]
    if (request.method === 'GET' && request.url === '/handles') {
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(handles));
        response.end();
    }
    else if (request.method === 'GET' && request.url.substring(0, 5) === '/user') {
        let userHandle = request.url.substring(5).split("?")[0]
        let queries = request.url.split("?").slice(1).map(query => query.split("="))
        
        let requireHandle = fs.readFile(path.join(infoPath, "users", userHandle + "tweetdata.json"), function (err, data) {
            if (err) response.statusCode = 404; response.end()
            
            response.setHeader('Content-Type', 'application/json');
            response.write(data.toString());
            response.end();
        })
    }

    else if (request.method === 'GET' && request.url.substring(0, 7) === '/tweets') {
        console.log(request.url);
        let userHandle = request.url.substring(7).split("?")[0]
        console.log(userHandle);
        let queries = request.url.split("?").slice(1).map(query => query.split("="))
        console.log(queries);
        let requireHandle = fs.readFile(path.join(infoPath, "tweets", userHandle + "tweetdata.json"), function (err, data) {
            if (err) response.statusCode = 404; response.end();
            response.setHeader('Content-Type', 'application/json');
            let parseData = JSON.parse(data.toString())
            // response.write(JSON.parse(data.toString()));
            let slicedData = parseData
            queries.forEach(function(query){
                if (!queryArr.includes(query[0])) {response.statusCode = 400
                    response.end();}
                if (query[0] === "count") {
                 slicedData = parseData.slice(0,query[1])
                }
            });
            response.write(JSON.stringify(slicedData));
            response.end();
        });
    }

    else {
        const body = {
            message: 'This is some JSON!'
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(body));
        response.end();
    }

})
server.listen(3000);