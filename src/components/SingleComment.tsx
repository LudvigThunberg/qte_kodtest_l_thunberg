import { IComment } from "../models/IComment"

interface ISingleCommentProps{
    comment: IComment,
}

export const SingleComment = (props: ISingleCommentProps) => {
    return(
        <>
            <p>Name: {props.comment.name}</p>
            <p>Comment: {props.comment.message}</p>
        </>
    )
}