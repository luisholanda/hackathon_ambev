/**
 * Filename: /home/luiscm/Projects/hackathon_ambev/routes/index.js
 * Path: /home/luiscm/Projects/hackathon_ambev
 * Created Date: Saturday, August 5th 2017, 2:56:54 pm
 * Author: luiscm
 * 
 * Copyright (c) 2017 Your Company
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//root route
router.get("/", function(req, res) {
    res.render('landing', {currentUser: req.user});
});

router.get("/product", function(req, res) {
    res.render('product', {currentUser: req.user});
});

//show register form
router.get("/register", function (req, res) {
   res.render('register', {currentUser: req.user});
});

router.get("/user", function(req, res){
   res.render('user', {currentUser: req.user});
});

//show sign up logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          req.flash('error', err.message);
          return res.render('register', {currentUser: req.user});
      }
      passport.authenticate('local')(req, res, function(){
         req.flash('success', 'Welcome to Social Beer ' + user.username);
         res.redirect('/');
      });
   });
});

//show login form
router.get('/login', function(req, res){
   res.render('login', {currentUser: req.user});
});

//handling login logic
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){

});

//logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect('/');
});

module.exports = router