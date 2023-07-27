import React from 'react'
import "./Join.css";
import logo from "../../images/favicon.png";
import {Link} from "react-router-dom";
import { useState } from 'react';

let user;

const sendUser=()=>{
  user = document.getElementById('JoinInput').value;
  document.getElementById('JoinInput').value="";
}

const Join = () => {

  const [name, setname] = useState("");

  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src = {logo} alt = "logo"/>
            <h1>Join Page</h1>
            <input onChange={(e)=>setname(e.target.value)} placeholder='Enter your name' type="text" id="JoinInput" />
            <Link onClick={(event)=>!name ? event.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link>
        </div>
        
    </div>
  )
}

export {user}
export default Join