import axios from "axios";
import { IPost } from "../models/IPost";

async function getPosts(): Promise<IPost[]> {
  return (await axios.get("http://localhost:8000/posts/")).data;
}

export default getPosts;
