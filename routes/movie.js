const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const Movie = require('../models/Movie');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//movies with director
router.get('/', (req, res) => {
    const promise = Movie.aggregate([
      {
        $lookup:{
          from: 'directors',
          localField: 'director_id',
          foreignField: '_id',
          as: 'director'
        }
      },
      {
        $unwind: '$director'
      }
    ]);

    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
    });
});

//movies top 10
router.get('/topten', (req, res) => {
  const promise = Movie.find().limit(10).sort({imdb_score: -1});

  promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
  });
});

//movies between
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year) }
  });
  promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
  });
});


//movie_detail
router.get('/:movie_id', (req, res) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
      if(!movie)
        next({message: "The movie was not found", code: 909});

      res.json(movie);
    }).catch((err) => {
      res.json(err);
    })
});

//movie_update
router.put('/:movie_id', (req, res) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body,{ new: true });
  
  promise.then((movie) => {
    if(!movie)
      next({message: "The movie was not found", code: 909});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

//movie_delete
router.delete('/:movie_id', (req, res) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  
  promise.then((movie) => {
    if(!movie)
      next({message: "The movie was not found", code: 909});

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});


//movie_insert
router.post('/', (req, res, next) => {
  //const { title, imdb_score, category, country, year } = req.body;
  
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((result) => {
    res.json(result);
  }).catch((err) => {
    res.json(err);
  });

  //Different Way
  /*const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });
  movie.save((err, data) => {
    if(err)
      res.json(err);

    res.json(data);
  })*/
});

module.exports = router;
