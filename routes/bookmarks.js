var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models
var Bookmark = require('../models/Bookmark.js');
var db = mongoose.connection;


router.get('/:email', function (req, res) {
    Bookmark.find({'email':req.params.email}).sort('-addeddate').populate('movie').exec(function (err, bookmarks) {
    if (err) res.status(500).send(err);
    else res.status(200).json(bookmarks);
   });
});

router.post('/', function (req, res) {
    Bookmark.create(req.body, function (err, bookmarkinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
    });
});

router.put('/:id', function (req, res) {
    Bookmark.findByIdAndUpdate(req.params.id, req.body, function (err,
    bookmarkinfo) {
     if (err) res.status(500).send(err);
     else res.sendStatus(200);
    });
});

router.delete('/:id', function (req, res) {
    Bookmark.findByIdAndDelete(req.params.id, function (err, postinfo) {
     if (err) res.status(500).send(err);
     else res.sendStatus(200);
     });
});


module.exports = router;