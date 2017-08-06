var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    self_description: String,
    photo: {
              data: Buffer,
              contentType: String
            },

    rank_name: String,
    level: Number,
    exp: Number

})

module.exports = mongoose.model("User", userSchema);
