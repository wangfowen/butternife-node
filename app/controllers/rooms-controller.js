module.exports = function(app, io) {

  app.get('/:roomName', function(req, res) {
    var params = {
      name: req.params.roomName
    };
    res.render('show.ejs', params);
  });

  app.get('/', function(req, res) {
    res.render('new.ejs', {});
  })
};
