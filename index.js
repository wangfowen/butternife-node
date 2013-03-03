







var express = require('express');
///wines = require('./routes/wines');
var app = express.createServer();
var port = process.env.PORT || 8000;

app.configure(function(){
  app.use(express.bodyParser());
  app.use(function(err,req,res,next){
    res.send(400, '');
  });
});

app.get('/trip/:id', function (req, res) {});

app.post('/routing', function (req, res) {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

app.listen(port);
console.log('Listening on port ' + port + '...');
