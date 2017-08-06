/**
 * Filename: /home/luiscm/Projects/hackathon_ambev/app.js
 * Path: /home/luiscm/Projects/hackathon_ambev
 * Created Date: Saturday, August 5th 2017, 2:47:23 pm
 * Author: luiscm
 * 
 * Copyright (c) 2017 Your Company
 */

var express = require('express');
var async = require('async');
var path = require('path');
var Beer = require('./models/beer');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

// Middlewares
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var helmet = require('helmet')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')


// Routes
var routes = require('./routes/index')

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// middlewares setup
function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb)
    }, next)
  }
}

app.use(parallel([
  // If nginx is used as load balancing,
  // you will need to disable some features
  helmet(),
  // uncomment after put your favicon in /public
  // favicon(path.join(__dirname, 'public', 'favicon.ico')),
  logger('dev'),
  bodyParser.json(),
  bodyParser.urlencoded({extended: false}),
  cookieParser(),
  express.static(path.join(__dirname, 'public'), {
    maxAge: 86400000 * 7
  }),
  compression({level: 1})
]))

// Routes setup
app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

