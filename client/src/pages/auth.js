import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Auth=()=>{
    return <div className="auth">
        <Login/>
        <Register/>
        <div>
            <img alt="food" src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8xOTY0OTg2MC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTczODU2MjUzNn0.m3TUdrOshs29Zobvpl2JYQhSOf6oIWe2RiiLjUUBJjU/img.jpg?width=980"/>
        </div>
    </div>
};

// Written here as it's used only by this
const Login=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const [,setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate();

    const onSubmit= async(event)=>{
        event.preventDefault();
        try{
            console.log({username,password})
            const response =await axios.post("http://localhost:3001/auth/login",{username,password});
            
            if(response.data.message==="User doesn't exist")
            {
                alert(response.data.message);
                // navigate("/auth");
            }
            setCookies("access_token",response.data.token);
            window.localStorage.setItem("userID",response.data.userID);
            navigate("/");

        }catch(err){
            console.log(err);
        }
    }


    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="LOGIN TO YOUR ACCOUNT"
            onSubmit={onSubmit}
        />
        );

};

const Register=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const onSubmit= async(event)=>{
        event.preventDefault();
        try{
            const response=await axios.post("http://localhost:3001/auth/register",{username,password});
            alert(response.data.message);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="REGISTER NEW USER"
            onSubmit={onSubmit}
        />
        );

};

const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
    return(<div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="i" value={username} type="text" id="username" onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <br/>
            <div className="form-group" >
                <label htmlFor="password">Password:</label>
                <input className="i" value={password} type="password" id="password" onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <button className="bs"type="submit">{label}</button>
        </form>        
    </div>);
}