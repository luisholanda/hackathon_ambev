var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://user:pass@ds133271.mlab.com:33271/hackathon');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,

    name: String,
    self_description: String,
    photo: String,
    rank_name: String,
    level: Number,
    exp: Number

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
