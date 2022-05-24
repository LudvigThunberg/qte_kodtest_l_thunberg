import axios from "axios";
import { IPost } from "../models/IPost";

async function getPosts(): Promise<IPost[]> {
  let response = await axios.get<IPost[]>("http://localhost:8000/posts/");
  return response.data;
}

async function sendPosts(post: IPost) {
  await axios.post("localhost:8000/posts/create", post).then((response) => {
    console.log(response);
  });
}

export default getPosts;
