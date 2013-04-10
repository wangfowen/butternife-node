module.exports = function(app, io) {

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
};