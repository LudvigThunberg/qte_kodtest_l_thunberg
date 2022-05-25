import { ChangeEvent, useState } from "react"

interface ICreatePostProps{
    createNewPost(post: string, name: string): void
}

export const CreatePost = (props: ICreatePostProps) => {
    const [input, setInput] = useState("")
    const [textarea, setTextarea] = useState("")
    const [isActive, setIsActive] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleTextareaChange  = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(e.target.value)
    }
    
    const addPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(textarea.length !== 0 && input.length !== 0){
            props.createNewPost(textarea, input)
            setInput("")
            setTextarea("")
            if(isActive === true){
                setIsActive(false)
            }
        }else{
            setIsActive(true)
        }
    }

    return(
        <>
            <form onSubmit={addPost}>
                <textarea name="post" onChange={handleTextareaChange} value={textarea} placeholder="Write your post..."></textarea>
                <input type="text" name="name" onChange={handleInputChange} value={input} placeholder="Name"/>
                <button type="submit">Save</button>
                {isActive? <p className="validate-new-post">Write in both fields</p>: <></>}
            </form>
        </>
    )
}