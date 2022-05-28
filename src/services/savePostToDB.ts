import axios from "axios";
import { IPost } from "../models/IPost";
import { Post } from "../models/Post";

async function sendPostToDB(post: Post): Promise<IPost> {
  return await (
    await axios.post("http://localhost:8000/posts/create", post)
  ).data;
}

export default sendPostToDB;
