import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { setToken, getToken, clearToken } from "../frontpage_login_register/tokenStorage";

const BrowserBar = () => {
const [loggedIn, setLoggedIn] = useState(false);
const [returnData, setReturnData] = useState(null);
const navigate = useNavigate();
const location = useLocation();



useEffect(() => {
    if (getToken() !== null) {
        setLoggedIn(true);
    }
    else {
        setLoggedIn(false);
        navigate("/");
    }
}
, []);

useEffect(() => {       // Tarkistaa onko käyttäjä kirjautunut sisään ja onko jollain muulla sivulla kuin etusivulla, tarvittaessa heittää etusivulle
    if(loggedIn === false && location.pathname !== "/" && location.pathname !== "/showall") {                                         // tähän pitää myöhemmin lisätä ehto sitä julkista linkkisivua varten jos tämä jää käyttöön
        navigate("/");
    } 
}, []);


const handleLogoutClick = (event) => { //   logout nappulan toiminto
    console.log("handle logout click");
    clearToken();
}


useEffect(() => {
if (loggedIn === false) {
    return setReturnData(
    <div className='logobar'>
        <div className="buttons">
        <Link to ="/login"><button className="navbutton">Log in</button></Link>
        <Link to ="/register"><button className="navbutton">Sign in</button></Link>
        <Link to ="/showall"><button className="navbutton">Show all</button></Link>
        </div>
        </div>) 
    }
    else {
        return setReturnData(
        <div className='logobar'>
        <div className="buttons">
        <Link to ="/menu"><button className="navbutton">Options</button></Link>
        <button className="navbutton" onClick={handleLogoutClick}>Log out</button>
        </div>
        </div>)
    }
}, [loggedIn]);

return (
    <div>
        {returnData}
    </div>
    );

};

export default BrowserBar;
//Jos login tila false, teksti kopioitu suoraan App.js alkuperäisistä teksteistä'
//Jos login tila true, täytä toiminnot, LOGOUT napille ajatuksena että se kutsus "clearToken()" ja sitten teoriassa tän pitäis osata suoraan heittää etusivulle