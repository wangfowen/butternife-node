module.exports = function(app, io) {
	app.post("/butternife/:roomName/user", function(req, res) {
		console.log(req.params.roomName);
	  console.log(req.body);
		sendResponse(res, getRoomAndAddUser(req.params.roomName, req.body));

	});

	app.delete("/butternife/:roomName/user", function (req, res) {
	  rooms[req.params.roomName].users.splice(res.body.user, 1);
	  sendResponse({status: "SUCCESS"});
	});
};