/*
// hi
console.log('your mom');

var port = process.env.PORT || 8000;

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + "/");
*/







var express = require('express');//,
///wines = require('./routes/wines');
var app = express.createServer();
var port = process.env.PORT || 8000;

app.configure(function(){
  app.use(express.bodyParser());
});

//app.get('/', wines.findAll);
app.get('/trip/:id', function (req, res) {});

app.post('/routing', function (req, res) {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

app.listen(port);
console.log('Listening on port ' + port + '...');
