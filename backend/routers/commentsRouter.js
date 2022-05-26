const express = require("express");
const commentsRouter = express.Router();

const CommentsModel = require("../models/CommentsModel.js");

//GET ALL COMMENTS
commentsRouter.get("/", async (req,res)=>{
    const comments = await CommentsModel.find();
    res.send(comments)
})

//GET COMMENT BY POSTID
commentsRouter.get("/:postId", async (req, res)=> {
    const postId = req.params.postId
    let comments = await CommentsModel.find({postId : postId})
    console.log(comments);
    res.send(comments)
})

//CREATE NEW COMMENT
commentsRouter.post("/create", async (req, res) => {
    const newComment = new CommentsModel({
        message: req.body.message,
        name: req.body.name,
        postId: req.body.postId,
    })

    await newComment.save()
    let comments = await CommentsModel.find({postId : req.body.postId})
    res.json(comments)
})

module.exports = commentsRouter;