module.exports = function(app, io) {
	app.post("/butternife/:roomName/user", function(req, res) {
		res.send(200);

	});

	app.delete("/butternife/:roomName/user", function (req, res) {
	  rooms[req.params.roomName].users.splice(res.body.user, 1);
	  sendResponse({status: "SUCCESS"});
	});
};