var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models
var Movie = require('../models/Movie.js');
var db = mongoose.connection;


router.get('/', function (req, res) {
    Movie.find().exec(
        function (err, movies) {
            if (err) res.status(500).send(err);
            else res.status(200).json(movies);
        }
    );
});

router.get('/:id', function (req, res, next) {
    Movie.findById(req.params.id, function (err, movieinfo) {
        if (err) res.status(500).send(err);
        else res.status(200).json(movieinfo);
    });
});

module.exports = router;
