import { IPost } from "../models/IPost"
import { CreateComment } from "./CreateComment"
import { Comment } from "../models/Comment"
import sendCommentToDB from "../services/saveCommentToDb"
import { useEffect, useState } from "react"
import { IComment } from "../models/IComment"
import getCommentsByPostId from "../services/getCommentsByPostId"
import { SingleComment } from "./SingleComment"
import {ErrorMessage} from "./ErrorMessage"
import "../scss/SinglePost.scss"
interface ISinglePostProps{
    post: IPost,

}

export const SinglePost = (props: ISinglePostProps) => {
    //ALL COPMONENT STATES
    const [allComments, setAllComments] = useState<IComment[]>([])
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState<Comment>({
        message: "",
        name: "",
        postId: "",
    })
    
    //SEND NEW COMMENT TO DB, RETURN COMMENT AND ADD TO ALLCOMMENTS
    useEffect(() => {
        function sendComment(){
            if(comment.message.length !== 0){
                sendCommentToDB(comment)
                .then((comment)=>{
                    setAllComments(allComments => [...allComments, comment])
                }).catch(error => {
                    console.log("Error!: ", error);
                    setError(true)
                })
            }
        }
        sendComment();
    },[comment])
    
    //GET ALL COMMENTS by postId FROM DB
    const getComments = () => {
        getCommentsByPostId(props.post._id)
        .then((response)=>{
            setAllComments(response)
            setIsActive(!isActive)
        }).catch((error) =>{
            console.log("Error!: ", error);
            setError(true)
        })
    }

    // SET LOCAL STATES
    const addComment = (message: string, name: string) => {
        setComment(new Comment(message, name, props.post._id))
    }

    const resetErrorMessage = () =>{
        setError(false)
    }

    // LOOP SINGLE COMMENT COMPONENT
    let comments = allComments.map((comment)=>{
        return(
            <SingleComment key={comment._id} comment={comment}></SingleComment> 
        )
    })
    
    let commentButton = <button onClick={getComments}>Comments</button>
    let createComment = <CreateComment addComment={addComment}></CreateComment>

    return(
        <div className="container">
            <div className="comment-container">
                <p className="name">{props.post.name}</p>
                <p className="post">{props.post.post}</p>
                {!isActive && commentButton}
                {isActive && createComment}
                {comments}
                <ErrorMessage resetErrorMessage={resetErrorMessage} error={error} ></ErrorMessage>
            </div>
        </div>
    )
}