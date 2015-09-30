var mongoose = require('mongoose');
var TVShow = mongoose.model('TVShow');

// GET - return all records
exports.findAllTVShows = function(req, res) {
  TVShow.find(function(err, tvshows) {
    if(err)
        res.send(500, err.message);
    console.log('GET /tvshows');
    res.status(200).jsonp(tvshows);
  });
};

// GET - record by id
exports.findById = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    if(err)
      return res.send(500, err.message);
    console.log('GET /tvshow/'+req.params.id);
    res.status(200).jsonp(tvshow);
  });
};

// POST - Insert new record
exports.addTVShow = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function(err, tvshow) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(tvshow);
  });
};

// PUT - Update record
exports.updateTVShow = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {

    tvshow.title = req.body.title;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function(err, tvshow) {
      if(err)
        res.send(500, err.message);
      res.status(200).jsonp(tvshow);
    });
  });
};

// DELETE
exports.deleteTVShow = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    tvshow.remove(function(err) {
      if(err)
        return res.send(500, err.message);
      //res.send(200);
      console.log('DELETE /tvshow/' + req.params.id);
      res.sendStatus(200);
    });
  });
};

