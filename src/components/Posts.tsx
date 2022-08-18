import { useEffect, useState } from "react";
import { IPost } from "../models/IPost";
import { Post } from "../models/Post";
import getPosts from "../services/getAllPostsService";
import sendPostToDB from "../services/savePostToDB";
import { CreatePost } from "./CreatePost";
import { SinglePost } from "./SinglePost";
import "../scss/Posts.scss";
import { ErrorMessage } from "./ErrorMessage";

export const Posts = () => {
  //COMPONENT STATES
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [singlePost, setSinglePost] = useState<Post>({ post: "", name: "" });
  const [error, setError] = useState(false);

  //SEND NEW POST TO DB, RETURN POST AND ADD TO ALLPOSTS
  useEffect(() => {
    const sendPost = async () => {
      if (singlePost.name.length !== 0) {
        const post = await sendPostToDB(singlePost);
        setAllPosts((allPosts) => [...allPosts, post]);
      }
    };
    sendPost();
  }, [singlePost]);

  //GET ALL POSTS FROM DB
  useEffect(() => {
    getPosts()
      .then((response) => {
        setAllPosts(response);
      })
      .catch((error) => {
        console.log("Error!: ", error);
        setError(true);
      });
  }, []);

  //SET SINGLE POST STATE
  const createNewPost = (name: string, post: string) => {
    setSinglePost(new Post(name, post));
  };

  const resetErrorMessage = () => {
    setError(false);
  };

  //LOOP SINGLE POST COMPONENT HTML
  let reversedAllPost = allPosts.map((post) => post).reverse();
  // let singlePostToComponent =
  //     reversedAllPost.map((p) =>{
  //         return(
  //             <SinglePost key={p._id} post={p} ></SinglePost>
  //         )
  //     })

  return (
    <>
      <div className="all-container">
        <h1>Posts and comments</h1>
        <CreatePost createNewPost={createNewPost}></CreatePost>
        {reversedAllPost.map((p) => (
          <SinglePost key={p._id} post={p} />
        ))}
      </div>
      <ErrorMessage
        resetErrorMessage={resetErrorMessage}
        error={error}
      ></ErrorMessage>
    </>
  );
};
