var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var db = null;


var users = [];
var rooms = [];

app.configure(function(){
  app.use(express.bodyParser());
  app.use(function(err,req,res,next){
    res.send(400, '');
  });
});


app.post("/butternife/:roomName/user", function(req, res) {
  console.log('here');
});

function getRoom(roomName, data) {
  var room;
  for (var i = 0; i < rooms.length; i++) {
    if (roomName == rooms[i].name) {
      room = rooms[i];
    }
  }

  if (room == null) {
    room = new Object();
    room.users = [];
  }

  room.users.push(data.user);
  room.mode = data.mode;
}

app.listen(8000);
console.log("App listen: " + port);