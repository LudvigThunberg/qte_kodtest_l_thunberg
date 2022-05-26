import { IPost } from "../models/IPost"
import { CreateComment } from "./CreateComment"
import { Comment } from "../models/Comment"
import sendCommentToDB from "../services/saveCommentToDb"
import { useEffect, useState } from "react"
import { IComment } from "../models/IComment"
import getCommentsByPostId from "../services/getCommentsByPostId"
import { SingleComment } from "./SingleComment"

interface ISinglePostProps{
    post: IPost,
}

export const SinglePost = (props: ISinglePostProps) => {
    const [allComments, setAllComments] = useState<IComment[]>([])
    const [comment, setComment] = useState<Comment>({
        message: "",
        name: "",
        postId: "",
    })
    
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

    const getComments = () => {
        getCommentsByPostId(props.post._id)
        .then((response)=>{
            setAllComments(response)
        })
    }

    const addComment = (message: string, name: string) => {
        setComment(new Comment(message, name, props.post._id))
    }
    
    let reversedSingleComments: IComment[] = allComments.map(comment => comment).reverse()
    let singleComment = reversedSingleComments.map((comment)=>{
        return(
            <SingleComment key={comment._id} comment={comment}></SingleComment>
        )
    })

    return(
        <>
        <p>{props.post.name}</p>
        <p>{props.post.post}</p>
        <button onClick={getComments}>Read Comments</button>
        <CreateComment addComment={addComment}></CreateComment>
        {singleComment}
        </>
    )
}