import React, { useEffect } from 'react'
import socketIo from "socket.io-client";
import {user} from "../Join/Join";
import "./Chat.css";
import send from "../../images/send.png";
import { useState } from 'react';
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import sendImg from "../../images/send.png";

let socket;

const ENDPOINT = "http://localhost:4500";

const Chat = () => {

    const [id,setId] =  useState("");
    const [messages, setMessages] = useState([])

    const send = ()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value = "";
    }
   
    useEffect(() => {
        socket = socketIo(ENDPOINT,{transports: ['websocket']});
        socket.on('connect',()=>{
            alert("connected");
            setId(socket.id);
        })

        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
        })

        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
        })

        socket.on('leave',(data)=>{
            setMessages([...messages,data]);
        })
    
      return () => {
        socket.emit('disconnected');
        socket.off();
      }
    }, [])

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
      })
    
      return () => {
        socket.off();
      }
    }, [messages])
    
    
    return (
    <div className='chatPage'>
        <div className="chatContainer">
            <div className="header">
                <h2>HelloAmp!</h2>
                <a href="/"><img src={closeIcon} alt='Close'/></a>
            </div>
            <ReactScrollToBottom className="chatBox">
                {messages.map((item,i)=><Message user = {item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'} />)}
            </ReactScrollToBottom>
            <div className="inputBox">
                <input onKeyPress={(event)=>event.key==='Enter' ?send():null}type='text' id='chatInput' />
                <button onClick = {send} className='sendbtn'><img src={sendImg} alt="Send" /></button>
            </div>
        </div>
      
    </div>
  )
}

export default Chat