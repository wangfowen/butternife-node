







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
  var body = req.body;
  var out = [];

  console.log(body);
  if (Object.prototype.toString.call(body) !== '[object Array]')
    res.send(400, '');

  for (var i in body){
console.log(i);
    if (!body[i].lat || !body[i].lon)
      res.send(400, '');
    out.push(body[i]);
    if (i == 0 || i == '0')
      continue;
console.log('here we go i='+i);
    var lat = body[i - 1].lat * .5 + body[i].lat * .5;
    var lon = body[i - 1].lon * .5 + body[i].lon * .5;
    out.push({lat: lat, lon: lon});
  }

  res.send(JSON.stringify(out));
});

app.listen(port);
console.log('Listening on port ' + port + '...');
