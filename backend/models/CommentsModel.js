const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    message: {type: String},
    name: {type: String},
    postId: {type: String}
})

const CommentsModel = mongoose.model("comments", commentsSchema);

module.exports = CommentsModel;