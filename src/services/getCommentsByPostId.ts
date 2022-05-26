import axios from "axios";
import { IComment } from "../models/IComment";

async function getCommentsByPostId(postId: string): Promise<IComment[]> {
  let response = await axios.get<IComment[]>(
    "http://localhost:8000/comments/" + postId + ""
  );
  return response.data;
}

export default getCommentsByPostId;
