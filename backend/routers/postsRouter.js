const express = require("express");
const postsRouter = express.Router();

const PostsModel = require("../models/PostsModel.js");

//GET ALL POSTS
postsRouter.get("/", async (rerq,res)=>{
    try{
        const posts = await PostsModel.find();
        res.send(posts)

    }catch(error){
        res.sendStatus(404)
    }
})

//CREATE NEW POST
postsRouter.post("/create", async (req,res) => {
    
    try{
        const newPost = new PostsModel({
            post: req.body.post,
            name: req.body.name,
        })
    
        const post = await newPost.save();
        /* console.log(post); */
        /* const posts = await PostsModel.find(); */
        res.send(post)

    }catch(error){
        res.sendStatus(500)
    }
})

module.exports = postsRouter;