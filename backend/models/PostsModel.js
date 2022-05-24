const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    post: {type: String},
    name: {type: String},
});

const PostsModel = mongoose.model("Posts", postsSchema);

module.exports = PostsModel