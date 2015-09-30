var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
  res.send("Hello world!");
});


mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err)
      throw err;
  console.log('Connected to database.');
});

var models = require('./models/tvshow')(app, mongoose);

app.use(router);

var TVShowController = require('./controllers/tvshows');

// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowController.findAllTVShows)
  .post(TVShowController.addTVShow);

tvshows.route('/tvshow/:id')
  .get(TVShowController.findById)
  .put(TVShowController.updateTVShow)
  .delete(TVShowController.deleteTVShow);

app.use('/api', tvshows);

app.listen(3000, function() {
  console.log('Node server running on http://localhost:3000');
});