




function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function sendEmail(to, subject, body){
  var SendGrid = require('sendgrid').SendGrid;
  var sendgrid = new SendGrid(
    process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD
    );
  sendgrid.send({
    to: to,
    from: 'kristopherwindsor@gmail.com',
    subject: subject,
    text: body
  }, function (ok, errors) {
    console.log(errors);
  });
}

function addAccountToTrip(cAccount, tripName, email, address, car){
  cAccount.insert({trip : tripName, email : email, address : address, car : car});
  sendEmail(email, 'Welcome to hellaroadtrip ' + tripName, 'You are in! Your address: ' + address);
}

var mongodb = require('mongodb');

var express = require('express');
var app = express.createServer();
var port = process.env.PORT || 8000;
var db = null;

app.configure(function(){
  app.use(express.bodyParser());
  app.use(function(err,req,res,next){
    res.send(400, '');
  });
});

app.get('/trip/:id', function (req, res) {});

// Create a new trip and add creator to trip

app.put('/trip/:tripName', function (req, res) {
  var tripName = req.params.tripName;
  var creator = req.body.creator, address = req.body.address, car = req.body.car;

  if (!tripName || /[^a-zA-Z0-9]/.test(tripName) || !validateEmail(creator) || car != parseInt(car + "")){
    res.send(400, '');
    return;
  }

  var cTrip = db.collection('trip'), cAccount = db.collection('account');
  cTrip.findOne({"name" : tripName}, function (err, result){
    if (err || result !== null){
      res.send(412, ''); // umm it might mean 500
      return;
    }

    cTrip.insert({"name" : tripName});
    addAccountToTrip(cAccount, tripName, creator, address, car);

    res.send(201, '');
  });
});

// Add a user to a trip (should send them invite email)

app.post('/trip/:tripName/addaccounts', function (req, res) {
  var tripName = req.params.tripName;
  var accounts = req.body;
  var cTrip = db.collection('trip'), cAccount = db.collection('account');

  if (!tripName || /[^a-zA-Z0-9]/.test(tripName) || Object.prototype.toString.call(accounts) !== '[object Array]'){
    res.send(400, 'bad trip name or accounts array');
    return;
  }
  if (cTrip.find({ name : tripName}).count() == 0){
    res.send(404, 'trip not found');
    return;
  }
  var mustNotExist = [];
  for (var i in accounts){
    if (!validateEmail(accounts[i].email) || accounts[i].car != parseInt(accounts[i].car + "")){
      res.send(400, 'at least one account is invalid');
      return;
    }
    mustNotExist.push({trip: tripName, email: accounts[i].email});
  }
  if (cAccount.find({ $or : mustNotExist }).count() > 0){
    res.send(412, 'at least one account already exists');
    return;
  }

  // validation ok

  for (var i in accounts){
    addAccountToTrip(cAccount, tripName, accounts[i].email, accounts[i].address, accounts[i].car);
  }
  res.send(201, '');
});

//

app.post('/routing', function (req, res) {
  var body = req.body;
  var out = [];

  console.log(body);
  if (Object.prototype.toString.call(body) !== '[object Array]'){
    res.send(400, '');
    return;
  }

  for (var i in body){
    if (!body[i].lat || !body[i].lon){
      res.send(400, '');
      return;
    }
    if (i != 0 && i != '0'){
      var lat = body[i - 1].lat * .5 + body[i].lat * .5;
      var lon = body[i - 1].lon * .5 + body[i].lon * .5;
      out.push({lat: lat, lon: lon});
    }
    out.push(body[i]);
  }

  res.send(JSON.stringify(out));
});

function init(port){
    db = new mongodb.Db('heroku_app12711444', new mongodb.Server('ds031647.mongolab.com', 31647, {auto_reconnect : true}), {w: 0});
    db.open(function (err, client){
	  client.authenticate('hellaroadtrip', 'hellaroadtrip', function (err, success){
        if (err){
          console.log("The database cannot be opened. Mongo is exiting now. " + err);
          process.exit(1);
        }
        app.listen(port);
        console.log('Listening on port ' + port + '...');
      });
    });
}

init(port);
