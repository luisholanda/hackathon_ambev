var moongose = require('moongose');

var userSchema = new moongose.Schema({
    name: String,
    self_description: String,

    rank_name: String,
    level: Number,
    exp: Number

})

module.exports = mongoose.model("User", userSchema);
