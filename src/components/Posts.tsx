import { useEffect, useState } from "react"
import { IPost } from "../models/IPost"
import { Post } from "../models/Post"
import getPosts from "../services/getAllPostsService"
import sendPostToDB from "../services/savePostToDB"
import { CreatePost } from "./CreatePost"
import { SinglePost } from "./SinglePost"

export const Posts = () => {
    const [allPosts, setAllPosts] = useState<IPost[]>([])
    const [singlePost, setSinglePost] = useState<Post>({post: "", name: ""})

    useEffect(() => {
        async function asyncfunc() {
            if(singlePost.name.length !== 0){
                await sendPostToDB(singlePost)
                .then((response)=>{
                    setAllPosts(response)
                    console.log("response", response);
                    
                })    
            }
        }    
        asyncfunc();
    }, [singlePost])

    useEffect(()=>{
            getPosts()
            .then((response)=>{
                setAllPosts(response)              
            })
    }, [])

    const createNewPost = (name: string, post: string) => {
        setSinglePost(new Post(name, post)) 

    }

    console.log(allPosts);
    
    let reversedAllPost = allPosts.map(post => post).reverse();

    let singlePostToComponent = 
        reversedAllPost.map((p) =>{
            return(
                <SinglePost key={p._id} post={p} ></SinglePost>
            )
        })
    
    return(
        <>
            <CreatePost createNewPost={createNewPost} ></CreatePost>
            {singlePostToComponent}
        </>
    )
}