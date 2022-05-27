import { ChangeEvent, FormEvent, useState } from "react"
import "../scss/CreateComment.scss"
interface ICreateCommentProps {
    addComment(message: string, name: string): void,
}

export const CreateComment = (props: ICreateCommentProps) =>{
    //COMPONENT STATES
    const[name, setName] = useState("")
    const[message, setMessage] = useState("")
    const [isActive, setIsActive] = useState(false)

    //HANDLE STATE/INPUT
    const nameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const messageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    //HANDLE FORM SUBMIT
    const handleSave = (e: FormEvent)=>{
        e.preventDefault();
        if(name.length !== 0 && message.length !== 0){
            props.addComment(message, name)
            setName("");
            setMessage("");
            if(isActive === true){
                setIsActive(false)
            }
        }else{
            setIsActive(true)
        }
    }
    return(
        <>
            <form onSubmit={handleSave}>
                <input type="text" value={message} name="message" onChange={messageInputChange} placeholder="comment..."/>
                <input type="text" value={name} name="name" onChange={nameInputChange} placeholder="name" />
                <button type="submit">Save</button>
                {isActive? <p className="validate-new-post">Please write in both fields...</p>: <></>}
            </form>
        </>
    )
}