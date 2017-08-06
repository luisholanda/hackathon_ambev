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
var User = require('./models/user');
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
var methodOverride = require('method-override')
var flash = require('connect-flash')

// Routes
var routes = require('./routes/index')

var app = express();

app.set("view engine", "ejs");
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
  compression({level: 1}),
  flash(),
  methodOverride("_method"),
  require("express-session")({
    secret: "fuck mega",
    resave: false,
    saveUninitialized: false
  }),
  passport.initialize(),
  passport.session()
]))

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes setup
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
    user = req.user;
    res.locals({
        currentUser: req.user
    });

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

