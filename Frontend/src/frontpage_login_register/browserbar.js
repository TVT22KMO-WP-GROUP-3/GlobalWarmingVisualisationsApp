import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation,} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


import { getToken, clearToken } from "../frontpage_login_register/tokenStorage";
import AlertDialog from "./shareview";

const BrowserBar = () => {
const [loggedIn, setLoggedIn] = useState(false);
const [returnData, setReturnData] = useState(null);
const [displayShareView, setDisplayShareView] = useState(false);
//const [viewString, setViewString] = useState(""); 
const [link, setLink] = useState('');
const navigate = useNavigate();
const location = useLocation();
const defaultViewCompareString = "0,0,0,0,0,0"; // ohjelma tallentaa näin
const defaultViewCompareString2 = "000000" // databasen default toiminto tallentaa näin
let Token = getToken();

useEffect(() => {
    if (Token !== null) {
        setLoggedIn(true);
    }
    else {
        setLoggedIn(false);
    }
}
, [Token]);  // tämän hookin täytyy olla riippuvainen getToken() haun tuloksen muuttumisesta


function createLink(viewID){
    return "http://localhost:3000/shared/" + viewID.toString();
  }
  
const handleSaveShareClick = async(event) => { 
    let latestViewString = await updateDefaultViewString(); // ensin katotaan view ajantasalle varmasti

    let viewID = uuidv4(); 
    console.log(viewID);
    console.log(" updaten jälkeen " + latestViewString);
    const response = await fetch('http://localhost:8080/savedviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + Token,
      },
        body: `viewID=${viewID}&viewstring=${latestViewString}`
    });

    if (response.status === 200) {
      console.log(response.status);
      setLink(createLink(viewID)); // linkki talteen
      setDisplayShareView(true); // näytä linkki
    }
    else {
      console.log(response.status);
    }
  }

  async function updateDefaultViewString() {  // palauttaa stringin
    try {
      const response = await fetch('http://localhost:8080/users/view', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + Token,
        },
      });
      const data = await response.text();
      console.log("Updaten data on " + data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  

async function checkDefaultView(){   // tarkistaa onko käyttäjällä tallennettua näkymää
    fetch('http://localhost:8080/users/view', {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + Token,
        },
    })
    .then(response => response.text())
    .then(data => {
        console.log(" Fethin data on " +data);
        if (data.toString() === defaultViewCompareString || data.toString() === defaultViewCompareString2){ // tarkistaa onko tallennettua näkymää
            navigate("/menu");
        }
        else{
            navigate("/menu/view");
           // setViewString(data.toString());
        }
    })
    .catch((error) => {
        console.error('Error:', error); 
    });
}


useEffect(() => {     // Tarkistaa onko käyttäjä kirjautunut sisään ja onko jollain muulla sivulla kuin julkisella sivulla, tarvittaessa heittää etusivulle
    if(loggedIn === false && location.pathname !== "/" 
    && location.pathname !== "/showall" 
    && location.pathname !== "/register" 
    && location.pathname !== "/login"
    && !location.pathname.includes("shared")
    ) {      
        console.log("Redirected by browserbar") ;                                  // tähän pitää myöhemmin lisätä ehto sitä julkista linkkisivua varten jos tämä jää käyttöön
        navigate("/");
    } 
    if (loggedIn === true && location.pathname === "/") {
        checkDefaultView();
    }
}, [loggedIn]);   // tämä testaamisen perusteella riittää että on riippuvainen tästä ja tarkistaa vain kun sivu renderöityy ekan kerran.


const handleLogoutClick = (event) => { //   logout nappulan toiminto
    clearToken();        // tokenin poisto
     // setLoggedIn(false);   // login tilan päivitys, todennäköisesti turha koska useEffect tarkistus enivei
    alert("Logout successful!");
    navigate("/");    // todennäkösesti turhaan tässä, koska aiempi useEffect on varmaan jo hoksannut muutoksen ja heittänyt etusivulle
}

const handleShareClick = (event) => {
    handleSaveShareClick();
    setDisplayShareView(displayShareView => !displayShareView);  // toggle the displayShareView state
  };

const handleShareClose = (event) => {
    setDisplayShareView(false);
    };

useEffect(() => {
if (loggedIn === false )  {   // vakionäkymän napit
    setReturnData(
    <div className='logobar'>
        <div className="buttons">
        <Link to ="/"><button data-testid="sign in" className="navbutton">Home</button></Link>
        <Link to ="/login"><button className="navbutton">Log in</button></Link>
        <Link to ="/register"><button className="navbutton">Sign in</button></Link>
        <Link to ="/showall"><button className="navbutton">Show all</button></Link>
        </div>
        </div>) 
    }
    else  {                 // sisäänkirjautuneen käyttäjän napit, kaksi if ehtoa näytetäänkö share view ja dialogiehto ja kyytiin open ja onClose
        setReturnData(
        <div className='logobar'>
            <div className="buttons">
                <Link to ="/menu"><button className="navbutton">Options</button></Link>
                <button className="navbutton" onClick={handleLogoutClick}>Log out</button>
                {location.pathname==="/menu/view" && (<button className="navbutton" onClick={handleShareClick}>Share view</button>)}
                {location.pathname==="/menu/view" && displayShareView && <AlertDialog open={displayShareView} onClose={handleShareClose} linkString={link} />}
            </div>
        </div>)
    }
}, [loggedIn, setReturnData, location.pathname, displayShareView, link]);    // riippuvainen näistä tiloista ja niiden muutoksista

return (
    <div>
        {returnData}
    </div>
    );

};

export default BrowserBar;
