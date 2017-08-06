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

router.get("/", function(req, res) {
    res.render('landing');
});

router.get("/product", (req, res) {
    res.render('product')
});

module.exports = router