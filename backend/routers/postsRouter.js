const express = require("express");
const postsRouter = express.Router();

const PostsModel = require("../models/PostsModel.js");

//GET ALL POSTS
postsRouter.get("/", async (rerq,res)=>{
    const posts = await PostsModel.find();
    res.send(posts)
})

//CREATE NEW POST
postsRouter.post("/create", async (req,res) => {
    const newPost = new PostsModel({
        id: req.body.id,
        post: req.body.post,
        name: req.body.name,
    })

    await newPost.save();
    const posts = await PostsModel.find();
    res.json(posts)
})

module.exports = postsRouter;