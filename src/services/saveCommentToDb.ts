import axios from "axios";
import { IComment } from "../models/IComment";
import { Comment } from "../models/Comment";

async function sendCommentToDB(comment: Comment): Promise<IComment[]> {
  return await axios
    .post<IComment[]>("http://localhost:8000/comments/create", comment)
    .then((response) => {
      console.log("sendCommentToDb", response.data);
      return response.data;
    });
}

export default sendCommentToDB;
