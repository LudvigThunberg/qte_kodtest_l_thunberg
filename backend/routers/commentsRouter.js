const express = require("express");
const commentsRouter = express.Router();

const CommentsModel = require("../models/CommentsModel.js");

//GET ALL COMMENTS
commentsRouter.get("/", async (req,res)=>{
    const comments = await CommentsModel.find();
    res.send(comments)
})

//CREATE NEW COMMENT
commentsRouter.post("/create", async (req, res) => {
    const newComment = new CommentsModel({
        comment: req.body.comment,
        postId: req.body.postId,
    })

    await newComment.save()
    res.sendStatus(201)
})

module.exports = commentsRouter;