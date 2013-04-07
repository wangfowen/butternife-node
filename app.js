var express = require('express');
var app = express();


var users = [];
var rooms = {size: 0};
console.log(__dirname + "/client");
app.configure(function(){
  app.use(express.bodyParser());
  app.use("/client", express.static(__dirname + "/client"));
});

app.get("/", function(req, res) {
  res.redirect("/client/index.html");
});

app.get("/user", function(req, res) {
	var user = new Object();
	user.name = "Jack_" + users.length;
	user.id = users.length;
	users.push(user);
	sendResponse(res, user);
});

app.post("/butternife/:roomName/user", function(req, res) {
	console.log(req.params.roomName);
  console.log(req.body);
	sendResponse(res, getRoomAndAddUser(req.params.roomName, req.body));

});

app.delete("/butternife/:roomName/user", function (req, res) {
  rooms[req.params.roomName].users.splice(res.body.user, 1);
  sendResponse({status: "SUCCESS"});
});

app.get("/butternife/:roomName/songs", function(req, res) {
  sendResponse(res, rooms[req.params.roomName].playlist.songs);
});

app.post("/butternife/:roomName/song", function(req, res) {
  rooms[req.params.roomName].playlist.songs.push(req.body.song);
  sendResponse(res, {status: "SUCCESS"});
});

app.post("/butternife/:roomName/song/next", function(req, res) {
  var roomName = req.params.roomName;
  var currentSongId = rooms[roomName].playlist.currentSongId = (rooms[roomName].playlist.currentSongId - 1 ) % rooms[roomName].playlist.songs.length;
  sendResponse(res, rooms[roomName].playlist.songs[currentSongId]);
});

app.post("/butternife/:roomName/song/prev", function(req, res) {
  var roomName = req.params.roomName;
  var currentSongId = rooms[roomName].playlist.currentSongId = (rooms[roomName].playlist.currentSongId - 1 ) % rooms[roomName].playlist.songs.length;
  sendResponse(res, rooms[roomName].playlist.songs[currentSongId]);
});

app.post("/butternife/:roomName/song/state", function(req, res) {
  var roomName = req.params.roomName;
  var state = rooms[roomName].playlist.currentPlayState = !Boolean(rooms[roomName].playlist.currentPlayState);
  sendResponse(res, {state: state});
});

app.delete("/butternife/:roomName/song", function(req, res) {
  rooms[roomName].playlist.songs.splice(req.body.song.id, 1);
  sendResponse(res, {status: "SUCCESS"});
});

function getRoomAndAddUser(roomName, data) {
  if (rooms[roomName] == null) {

    rooms[roomName] = {
      name: roomName,
      id: rooms.size,
      playlist: {
        songs: [],
        id: rooms.size
      },
      users : []
    };

    rooms.size++;
  }

  rooms[roomName].mode = data.mode;
  rooms[roomName].users.push(users[data.user]);

  return rooms[roomName];
}

function sendResponse(res, data) {
	res.header('Content-type','application/json');
  res.header('Charset','utf8');
  res.send(JSON.stringify(data));
}

app.listen(8000);
console.log("App listen 8000");