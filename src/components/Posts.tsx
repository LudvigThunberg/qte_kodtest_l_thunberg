import { useEffect, useState } from "react"
import { IPost } from "../models/IPost"
import getPosts from "../services/postsServices"

export const Posts = () => {
    const [allPosts, setAllPosts] = useState<IPost[]>([])

    useEffect(()=>{
        if(allPosts.length !== 0) return;
            getPosts()
            .then((response)=>{
                setAllPosts(response)               
            })
    },)
    console.log(allPosts);
    
    return(
        <></>
    )
}