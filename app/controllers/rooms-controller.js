module.exports = function(app, io) {

	app.get('/butternife/:roomName', function(req, res) {
		var params = {};
		//TODO: is this how you render?
		res.render('show.ejs', params);
	});

	app.get('/butternife', function(req, res) {
		//TODO: render new.ejs
	});
};