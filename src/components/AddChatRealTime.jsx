import { useState, useEffect } from "react";
import { listenTo, writeChatData } from "../firebase";

const AddChatRealTime = () => {
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        writeChatData(message);
        setMessage("");
    }
    useEffect(()=>{
        listenTo("chats", setChats);
    },[])
    return (
        <>
        <div>
            <ul>
                {
                    Object.keys(chats).map((v,k)=>{
                        return <li>{chats[v].message}</li>
                })
                }
            </ul>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message"/>
                <button>Send</button>
            </form>
        </div>
        </>
    )
}

export default AddChatRealTime