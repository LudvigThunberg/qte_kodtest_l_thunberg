import { ChangeEvent, FormEvent, useState } from "react"

interface ICreateCommentProps {
    addComment(message: string, name: string): void,
}

export const CreateComment = (props: ICreateCommentProps) =>{
    /* const [comment, setComment] = useState<Comment>({
        message: "",
        name: "",
        postId: props._id,
    }) */
    const[name, setName] = useState("")
    const[message, setMessage] = useState("")

    const nameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const messageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleSave = (e: FormEvent)=>{
        e.preventDefault();
        if(name.length !== 0 && message.length !== 0){
            props.addComment(message, name)
            setName("");
            setMessage("");
        }
    }
    return(
        <>
            <form onSubmit={handleSave}>
                <input type="text" value={message} name="message" onChange={messageInputChange} placeholder="comment..."/>
                <input type="text" value={name} name="name" onChange={nameInputChange} placeholder="name" />
                <button type="submit">Save</button>
            </form>
        </>
    )
}