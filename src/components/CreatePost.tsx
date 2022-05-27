import { ChangeEvent, useState } from "react"
import "../scss/CreatePost.scss"
interface ICreatePostProps{
    createNewPost(post: string, name: string): void
}

export const CreatePost = (props: ICreatePostProps) => {
    //COMPONENT STATES
    const [input, setInput] = useState("")
    const [textarea, setTextarea] = useState("")
    const [isActive, setIsActive] = useState(false)

    //HANDLE STATE/INPUT
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleTextareaChange  = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(e.target.value)
    }
    
    //HANDLE FORM SUBMIT
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
            <form className="form" onSubmit={addPost}>
                <div className="input-textarea">
                <textarea name="post" onChange={handleTextareaChange} value={textarea} placeholder="Write your post..."></textarea>
                <input type="text" name="name" onChange={handleInputChange} value={input} placeholder="Name"/>
                </div>
                <button type="submit">Save</button>
                {isActive? <p className="validate-new-post">Please write in both fields...</p>: <></>}
            </form>
        </>
    )
}