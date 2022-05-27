import { useEffect, useState } from "react"
import { IPost } from "../models/IPost"
import { Post } from "../models/Post"
import getPosts from "../services/getAllPostsService"
import sendPostToDB from "../services/savePostToDB"
import { CreatePost } from "./CreatePost"
import { SinglePost } from "./SinglePost"
import "../scss/Posts.scss"

export const Posts = () => {
    //COMPONENT STATES
    const [allPosts, setAllPosts] = useState<IPost[]>([])
    const [singlePost, setSinglePost] = useState<Post>({post: "", name: ""})

    //SEND NEW POST TO DB AND RETURN ALL POSTS
    useEffect(() => {
        async function asyncfunc() {
            if(singlePost.name.length !== 0){
                await sendPostToDB(singlePost)
                .then((response)=>{
                    setAllPosts(response)
                })    
            }
        }    
        asyncfunc();
    }, [singlePost])

    //GET ALL POSTS FROM DB
    useEffect(()=>{
            getPosts()
            .then((response)=>{
                setAllPosts(response)              
            })
    }, [])

    //SET SINGLE POST STATE
    const createNewPost = (name: string, post: string) => {
        setSinglePost(new Post(name, post))
    }
    
    //LOOP SINGLE POST COMPONENT HTML
    let reversedAllPost = allPosts.map(post => post).reverse();
    let singlePostToComponent = 
        reversedAllPost.map((p) =>{
            return(
                <SinglePost key={p._id} post={p} ></SinglePost>
            )
        })
    
    return(
        <>
        <div className="all-container">
        <h1>Posts and comments</h1>
            <CreatePost createNewPost={createNewPost} ></CreatePost>
            {singlePostToComponent}
        </div>
        </>
    )
}