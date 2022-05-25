import axios from "axios";
import { IPost } from "../models/IPost";
import { Post } from "../models/Post";

async function sendPostToDB(post: Post): Promise<IPost[]> {
  return await axios
    .post("http://localhost:8000/posts/create", post)
    .then((response) => {
      console.log("sendPostToDB: ", response.data);
      return response.data;
    });
}

export default sendPostToDB;
