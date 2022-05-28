import axios from "axios";
import { IComment } from "../models/IComment";
import { Comment } from "../models/Comment";

async function sendCommentToDB(comment: Comment): Promise<IComment> {
  return (await axios.post("http://localhost:8000/comments/create", comment))
    .data;
}

export default sendCommentToDB;
