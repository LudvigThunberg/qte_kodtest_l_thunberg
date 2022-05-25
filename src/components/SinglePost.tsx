import { IPost } from "../models/IPost"

interface ISinglePostProps{
    post: IPost,
}

export const SinglePost = (props: ISinglePostProps) => {
    console.log(props.post);
    
    return(
        <>
        <p>{props.post.name}</p>
        <p>{props.post.post}</p>
        </>
    )
}