const http = require('http');
const fs = require('fs');
const handles = require("../BE-first_web_server/tweetinfo/handles")
const path = require("path")

const url = require("url")
// const handles = [
//   'mauro',
//   'dennis',
//   'francis'
// ]
var userdata = "../BE-first_web_server/tweetinfo/users/"
const server = http.createServer(function (request, response) {
    console.log(request.method);
    console.log(request.url);

    if (request.method === 'GET' && request.url === '/handles') {
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(handles));
        response.end();
    }
    if (request.method === 'GET' && request.url.substring(0, 5) === '/user') {
        let userHandle = request.url.substring(5)
        let requireHandle = fs.readFile("../BE-first_web_server/tweetinfo/users" + userHandle + "tweetdata.json", function (err, data) {
            if (err) response.write("not found");
            response.setHeader('Content-Type', 'application/json');
            response.write(data.toString());
            response.end();
        })



    }
    else if (request.method === 'GET' && request.url.substring(0, 7) === '/tweets') {
        let userHandle = request.url.substring(7)
        let requireHandle = fs.readFile("../BE-first_web_server/tweetinfo/tweets" + userHandle + "tweetdata.json", function (err, data) {
            if (err) response.write("not found")
            response.setHeader('Content-Type', 'application/json');
            response.write(data.toString());
            response.end();
        })

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
    if (request.method === 'GET' && request.url === '/handles') {
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(handles));
        response.end();
    };
})
server.listen(3000);