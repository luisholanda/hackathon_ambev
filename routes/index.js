/**
 * Filename: /home/luiscm/Projects/hackathon_ambev/routes/index.js
 * Path: /home/luiscm/Projects/hackathon_ambev
 * Created Date: Saturday, August 5th 2017, 2:56:54 pm
 * Author: luiscm
 *
 * Copyright (c) 2017 Your Company
 */

var fs = require('fs');

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


//root route
router.get("/", function(req, res) {
    res.render('landing', {currentUser: req.user});
});

router.get("/shop", function(req, res) {
    res.render('shop', {currentUser: req.user});
});

router.get("/product", function(req, res) {
    res.render('product', {currentUser: req.user});
});

//show register form
router.get("/register", function (req, res) {
   res.render('register', {currentUser: req.user});
});

router.get("/user/:username", function(req, res) {
    username = req.params.username;

    User.findOne({'name': username})
        .then(function (user) {
            console.log(user);
            if (!user)
                res.redirect('/')
            else {
                if (!user.photo) {
                    user.photo = {
                        contentType: 'image/jpg'
                    }

                    fs.read('../public/img/eric.jpg', function (err, _, buf) {
                        user.photo.data = buf.toString('base64');

                        res.render('user', user)
                    })
                } else {
                    user.photo.data = user.photo.data.buffer.toString('base64')

                    res.render('user', user)
                }

            }
        })
});

//show sign up logic
router.post("/register", function(req, res){
  console.log("oioi");
   var newUser = new User({username: req.body.username});
   console.log( toString(newUser) );
   User.register(newUser, req.body.password, function(err, user){
      if(err){
        console.log("oioioi");
          req.flash('error', err.message);
          return res.render('register', {currentUser: req.user});
      }

      console.log("Registrou novo usuario " + user.username);
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
  router.post('/login', function (req, res, next){
    console.log(req.session);
    console.log("OI");
    console.log(req.cookies);

    next();
  }, passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    })
);

//logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect('/');
});

router.get('/profile', function(req, res){
  console.log(req.user);
  User.findOne(
    {
      username: req.session.passport.user
    }
  ).then( function(user) {

        res.render('userprofile',
             {
               currentUser: {
                 name: user.name,
                 self_description: user.self_description,
                 rank_name: user.rank_name,
                 level: user.level,
                 exp: user.exp
               }
             });
      });
});

module.exports = router
