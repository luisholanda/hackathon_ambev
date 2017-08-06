var mongoose = require("mongoose");

mongoose.connect('mongodb://user:pass@ds133271.mlab.com:33271/hackathon');

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);