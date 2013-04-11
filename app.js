// Requirements
var express = require('express');
var http = require('http');

// Create application.
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Catch All Exceptions
process.on('uncaughtException', function(e) {
  console.error(e);
  process.exit(1);
});

//TODO: replace with DB stuff
global.users = [];
global.rooms = {size: 0};

// Set root directory name
global.rd = global.rootdir = function(relativePath) {
  if (relativePath === null) {
    relativePath = '';
  }

  return __dirname + relativePath;
};

global.getRoomAndAddUser = function(roomName, data) {
  if (rooms[roomName] === null) {

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
};

global.sendResponse = function(res, data) {
	res.header('Content-type','application/json');
  res.header('Charset','utf8');
  res.send(JSON.stringify(data));
};

app.configure(function(){
  app.use(express.bodyParser());
  app.set('views', rd('/app/views'));
  app.set('view engine', 'ejs');
  app.use(express.static(rd('/public')));
});

//TODO: better way to do this? does this actually work? see code from beats
require(rd('/app/controllers/api/rooms-controller'))(app, io);
require(rd('/app/controllers/api/songs-controller'))(app, io);
require(rd('/app/controllers/api/users-controller'))(app, io);
require(rd('/app/controllers/rooms-controller'))(app, io);

server.listen(process.env.PORT || 8000);
console.log("App listen 8000");