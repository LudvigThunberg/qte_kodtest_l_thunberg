import axios from "axios";
import { Post } from "../models/Post";
import { IPost } from "../models/IPost";

async function getPosts(): Promise<IPost[]> {
  let response = await axios.get<IPost[]>("http://localhost:8000/posts/");
  return response.data;
}

export default getPosts;
