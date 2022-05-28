import axios from "axios";
import { IComment } from "../models/IComment";

async function getCommentsByPostId(postId: string): Promise<IComment[]> {
  return (await axios.get("http://localhost:8000/comments/" + postId + ""))
    .data;
}

export default getCommentsByPostId;
