




function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var Firebase = require('./firebase-node');
var db = new Firebase('https://hellaroadtrip.firebaseIO-demo.com/');

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

app.post('/trip/:tripName', function (req, res) {
  var tripName = req.params.tripName;
  var creator = req.body.creator, address = req.body.address, car = req.body.car;

  if (!tripName || /[^a-zA-Z0-9]/.test(tripName) || !validateEmail(creator) || car != parseInt(car + ""))
    res.send(400, '');

  db.push({"test":"yes"});

  // does it exist?
  //res.send(412, '');
  //save
  //save creator
  //send email
});

app.post('/routing', function (req, res) {
  var body = req.body;
  var out = [];

  console.log(body);
  if (Object.prototype.toString.call(body) !== '[object Array]')
    res.send(400, '');

  for (var i in body){
    if (!body[i].lat || !body[i].lon)
      res.send(400, '');
    if (i != 0 && i != '0'){
      var lat = body[i - 1].lat * .5 + body[i].lat * .5;
      var lon = body[i - 1].lon * .5 + body[i].lon * .5;
      out.push({lat: lat, lon: lon});
    }
    out.push(body[i]);
  }

  res.send(JSON.stringify(out));
});

app.listen(port);
console.log('Listening on port ' + port + '...');
