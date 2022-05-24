const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    comment: {type: String},
    postId: {type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }
})

const CommentsModel = mongoose.model("comments", commentsSchema);

module.exports = CommentsModel;