import React from "react";
import { useState } from "react";
import { setToken, getToken, clearToken } from "./tokenStorage";
import { Link, useNavigate  } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigate = useNavigate();
    
    const handleRegSuccess = () => {
        setRegisterSuccess(true);
    }

    const regBtn = async (event) => {
       event.preventDefault();   // event objektista löytyy, estää selaimen sekaantumisen formiin(?) ja sen sijaan mennään omilla toiminnoilla
       console.log("regBtn pressed");
       if(username === "" || password === "") {
              alert("Username or password missing");
              return;
         }
         console.log("Registering user " +username);
        await register(username, password);
    }

    async function register(username, password) {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`
        });
        console.log("Response status " +response.status);
        if (response.status === 200) {
            const data = await response.text();
            handleRegSuccess();
            console.log(data);
            setTimeout(() => {
            navigate("/login");
            }, 2000);
          } else {
            alert("Invalid username or username already taken");
            console.log(response.status);
          }  
    }


   


    return (
        <div className="frontpage">
             {registerSuccess ? (
      <h1 data-testid="regOK">Registration successful!</h1>
    ) : (
      <h1>Register and make your own view!</h1>
    )}
            <div className="frontpage">
            <form onSubmit={regBtn}>
                <div id="checkboxes" data-testid="username"><label>
                    Username:
                    <input type="text" name="username" value={username} onChange={(event)=> setUsername(event.target.value)}/>
                </label></div>
                <div id="checkboxes" data-testid="password"><label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
                </label></div>
                <button id="buttons" data-testid="regbtn" type="submit">Register</button>
            </form>
            <Link to="/"><button id="buttons">Back</button></Link>
            </div>
        </div>
    )
}

export default RegisterPage;