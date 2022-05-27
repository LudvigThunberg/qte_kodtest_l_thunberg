import { IPost } from "../models/IPost"
import { CreateComment } from "./CreateComment"
import { Comment } from "../models/Comment"
import sendCommentToDB from "../services/saveCommentToDb"
import { useEffect, useState } from "react"
import { IComment } from "../models/IComment"
import getCommentsByPostId from "../services/getCommentsByPostId"
import { SingleComment } from "./SingleComment"
import "../scss/SinglePost.scss"
interface ISinglePostProps{
    post: IPost,
}

export const SinglePost = (props: ISinglePostProps) => {
    //ALL COPMONENT STATES
    const [allComments, setAllComments] = useState<IComment[]>([])
    const [isActive, setIsActive] = useState(false);
    const [comment, setComment] = useState<Comment>({
        message: "",
        name: "",
        postId: "",
    })
    
    //SEND NEW COMMENT TO DB AND RETURN ALL COMMENTS
    useEffect(() => {
        async function asyncfunc(){
            if(comment.message.length !== 0){
                await sendCommentToDB(comment)
                .then((response)=>{
                    setAllComments(response)
                })
            }
        }
        asyncfunc();
    },[comment])

    //GET ALL COMMENTS FROM DB
    const getComments = () => {
        getCommentsByPostId(props.post._id)
        .then((response)=>{
            setAllComments(response)
            setIsActive(!isActive)
        })
    }
    // SET LOCAL STATES
    const addComment = (message: string, name: string) => {
        setComment(new Comment(message, name, props.post._id))
    }

    // LOOP SINGLE COMMENT COMPONENT
    let singleComment = allComments.map((comment)=>{
        return(
            <SingleComment key={comment._id} comment={comment}></SingleComment> 
        )
    })

    // CONDITIONAL RENDERD HTML
    let commentButton = <button onClick={getComments}>Comments</button>
    if(isActive){
        commentButton = <div></div>
    }

    let createComment = <></>
    if(isActive){
       createComment = <CreateComment addComment={addComment}></CreateComment>
    }


    return(
        <div className="container">
            <div className="comment-container">
                <p className="name">{props.post.name}</p>
                <p className="post">{props.post.post}</p>
                {commentButton}
                {createComment}
                {singleComment}
            </div>
        </div>
    )
}