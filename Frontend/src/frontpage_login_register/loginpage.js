import React from "react";
import { useState } from "react";
import { setToken, getToken, clearToken } from "./tokenStorage";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const defaultViewCompareString = "0,0,0,0,0,0"; // ohjelma tallentaa näin
    const defaultViewCompareString2 = "000000" // databasen default toiminto tallentaa näin
    const [loginFail, setLoginFail] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const loginBtn = async (event) => {
       event.preventDefault();   // event objektista löytyy, estää selaimen sekaantumisen formiin(?) ja sen sijaan mennään omilla toiminnoilla
       if(username === "" || password === "") {
            handleLoginFail();
              return;
         }
       await login(username, password);
    }

    const handleLoginFail = () => {
        setLoginFail(true);
    }

    const handleLoginSuccess = () => {
        setLoginSuccess(true);
    }

    async function login(username, password) {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ":" + password),
            },
        });
        if (response.status === 200) {
        const data = await response.text();
        console.log(response.status)
        setToken(data);
        handleLoginSuccess();
        await new Promise(resolve => setTimeout(resolve, 1000)); // annetaan teksti näkyy hetken
        //console.log("Token datassa on " +data);
        //console.log("Token on "+ getToken());
       await checkDefaultView();
    }   
    else {
        handleLoginFail();
        console.log(response.status)
    }
    }

    async function checkDefaultView(){
        fetch('http://localhost:8080/users/view', {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + getToken(),
            },
        })
        .then(response => response.text())
        .then(data => {
            //console.log(" Fethin data on " +data);
            if (data.toString() === defaultViewCompareString || data.toString() === defaultViewCompareString2 || data.toString() === ""){ // tarkistaa onko tallennettua näkymää
                navigate("/menu");
            }
            else{
                navigate("/menu/view");
            }
        })
        .catch((error) => {
            console.error('Error:', error); 
        });
    }


    return (
        <div className="frontpage">
            {loginSuccess ? (<h1>Success!</h1>) : ( <>
            {loginFail ? (
                <h1>Login failed!</h1>
                 ) : (
                    <h1>Login</h1>)}</>) }
            <form onSubmit={loginBtn}>
                <div id="checkboxes"><label>
                    Username:
                    <input type="text" data-testid="username" name="username" value={username} onChange={(event)=> setUsername(event.target.value)}/>
                </label></div>
                <div id="checkboxes"><label>
                    Password:
                    <input type="password" data-testid="password" name="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
                </label></div>
                <button id="buttons" data-testid="logbtn" type="submit">Login</button>
            </form>
            <Link to="/"><button id="buttons">Back</button></Link>
        </div>
    )
}

export default LoginPage;