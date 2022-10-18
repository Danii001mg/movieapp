var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var debug = require("debug")("movieapp:server");

var mongoose = require('mongoose');
mongoose
  .connect("mongodb+srv://DanielMG:ssiiuu1@cluster0.co6zaej.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas DataBase connection successful"))
  .catch((err) => debug(err));

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var bookmarksRouter = require('./routes/bookmarks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/bookmarks', bookmarksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
