const express = require("express");
const commentsRouter = express.Router();

const CommentsModel = require("../models/CommentsModel.js");

/* //GET ALL COMMENTS
commentsRouter.get("/", async (req,res)=>{

    try{
        throw new Error("eror")
        const comments = await CommentsModel.find();
        res.send(comments)
    }catch(error){
        res.sendStatus(404)
    }
}) */

//GET COMMENT BY POSTID
commentsRouter.get("/:postId", async (req, res)=> {   

    try{   
        const postId = req.params.postId
        let comments = await CommentsModel.find({postId : postId})
        res.send(comments)
    }catch(error){
        res.sendStatus(404)
    }
})

//CREATE NEW COMMENT
commentsRouter.post("/create", async (req, res) => {

    try {     
        const newComment = new CommentsModel({
            message: req.body.message,
            name: req.body.name,
            postId: req.body.postId,
        })
        
        let comment = await newComment.save()
        res.send(comment)
    } catch (error) {
       res.sendStatus(500) 
    }

})

module.exports = commentsRouter;