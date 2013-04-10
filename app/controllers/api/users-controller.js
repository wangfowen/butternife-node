module.exports = function(app, io) {
	app.get("/user", function(req, res) {
		var user = new Object();
		user.name = "Jack_" + users.length;
		user.id = users.length;
		users.push(user);
		sendResponse(res, user);
	});
};