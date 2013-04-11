module.exports = function(app, io) {

	app.get('/:roomName', function(req, res) {
		var params = {
			name: req.params.roomName
		};
		//TODO: is this how you render?
		res.render('show.ejs', params);
	});

	// app.get('/butternife', function(req, res) {
	// 	//TODO: render new.ejs
	// });

	app.get('/', function(req, res) {
		res.render('new.ejs', {});
	})
};