import { IComment } from "../models/IComment"
import "../scss/SingleComment.scss"
interface ISingleCommentProps{
    comment: IComment,
}

export const SingleComment = (props: ISingleCommentProps) => {
    return(
        <div className="container">
            <p className="name">{props.comment.name}</p>
            <p className="post">{props.comment.message}</p>
        </div>
    )
}