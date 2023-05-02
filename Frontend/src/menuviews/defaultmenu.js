import React from "react";
import { useState, useEffect } from "react";
import { getToken, setToken, clearToken } from "../frontpage_login_register/tokenStorage";
import { Link, useNavigate } from "react-router-dom";
import Switch from 'react-switch'
import Popup from 'reactjs-popup';
import "./popupstyle.css"



const DefaultMenu = () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [viewChecked, setViewChecked] = useState(false);
    


    const navigate = useNavigate();
    const [defaultView, setDefaultView] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/users/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + getToken(),
            },
        })
        .then(response => response.text())
        .then(data => {
            setDefaultView(data);
            console.log(data);
        })
    }, [])

    const handleChange1 = (event) => {
        setChecked1(event.target.checked);
    };
    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
    };
    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
    };
    const handleChange4 = (event) => {
        setChecked4(event.target.checked);
    };
    const handleChange5 = (event) => {
        setChecked5(event.target.checked);
    };
    const handleChangeView = nextChecked => {
        setViewChecked(nextChecked);
    };
    

    const callRender = async (event) => {
        event.preventDefault();
        let view = [0,0,0,0,0,0];
        if(checked1===true){
            view[0] = 1;
        }
        if(checked2 === true){
            view[1] = 1;
        }
        if(checked3 === true){
            view[2] = 1;
        }
        if(checked4 === true){
            view[3] = 1;
        }
        if(checked5 === true){
            view[4] = 1;
        }
        if(viewChecked === true){
            view[5] = 1;  // hox jos 0 niin ylhäältä alas eli normaali
        }
        if(view[0]+view[1]+view[2]+view[3]+view[4] !== 0){
        let viewString = view.toString();
        console.log(viewString);
        fetch('http://localhost:8080/users/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + getToken(),
            },
            body: `defaultview=${viewString}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            navigate("/menu/view");
        })
    } else {
        alert("You have to select at least one chart to view!");
    }
    }

const myPopup = (deleteAccountHandler) => (
  <Popup
    trigger={<button className="button">Delete account</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <div className="header"> Are you sure you want to delete your account? </div>
        <div className="actions">
          <button className="button" onClick={deleteAccountHandler}>
            Yes
          </button>
          <button
            className="button" onClick={close}>
            No
          </button>
          </div>
        </div>
    )}
  </Popup>
);


    const deleteAccountHandler = async (event) => {
        const response = await fetch('http://localhost:8080/users/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + getToken(),
            },
        });
        if(response.status === 200){
            clearToken();
            navigate("/menu");
        } else {
            alert("Something went wrong");
            console.log(response.status)
        }
    }


    

    const deleteViewHandler = async (event) => {
         const response = await fetch('http://localhost:8080/users/view', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + getToken(),
            },
        });
        if(response.status === 200){
            navigate("/menu");
        } else {
            alert("Something went wrong");
            console.log(response.status)

        }
    }
        


    return (
       <div className="viewoptions"> <div id="checkboxes">
            <h1>View options</h1>
            <p>Select charts you want to see on your personalized view:</p>
            <div><input type="checkbox" checked={checked1} onChange={handleChange1} />
            <label>Visual 1</label></div>

            <div><input type="checkbox" checked={checked2} onChange={handleChange2} />
            <label>Visual 2</label></div>

            <div><input type="checkbox" checked={checked3} onChange={handleChange3} />
            <label>Visual 3</label></div>

            <div><input type="checkbox" checked={checked4} onChange={handleChange4} />
            <label>Visual 4</label></div>

            <div><input type="checkbox" checked={checked5} onChange={handleChange5} />
            <label>Visual 5</label></div>
        </div>
        <p>Select layout:</p>
        <div id ="checkboxes">
            <label id="switchlabels">
        <Switch 
        checked={viewChecked} onChange={handleChangeView} label="Vertical"
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#5A5A5A"
         />
        </label>
        <p><span>{viewChecked ? 'Horizontal' : 'Vertical'}</span></p>
        </div>
        <div id="buttongroup">
            {myPopup(deleteAccountHandler)}
            <button onClick={deleteViewHandler}>Delete view</button>
        </div>
        <div id="buttongroup">
            <button onClick={callRender}>Save&Show view</button>
            <Link to = "/menu/view"><button>Back</button></Link>
        </div>
        </div>
    )
}

export default DefaultMenu;