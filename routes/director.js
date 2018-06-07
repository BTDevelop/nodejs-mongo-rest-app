const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//Models
const Director = require('../models/Director');

//director insert
router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//director
router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    }
  ]);
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

//director_update
router.put('/:director_id', (req, res) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body,{ new: true });
  
  promise.then((director) => {
    if(!director)
      next({message: "The director was not found", code: 909});

    res.json(director);
  }).catch((err) => {
    res.json(err);
  })
});

//movie_delete
router.delete('/:director_id', (req, res) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);
  
  promise.then((director) => {
    if(!director)
      next({message: "The director was not found", code: 909});

    res.json(director);
  }).catch((err) => {
    res.json(err);
  })
});

//directories 
router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'director_id',
          as: 'movies'
        }
      },
      {
        $unwind: {
          path: '$movies',
          preserveNullAndEmptyArrays: true //null olanalrıda döndürür
        }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push : '$movies'
          }
        }
      },
      {
        $project:{ //en baştaki id değerini yerine project işlemi 
          _id: '$_id._id', 
          name: '$_id.name',
          surname: '$_id.surname',
          movies: '$movies'
        }
      }
    ]);

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });

module.exports = router;
