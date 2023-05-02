import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // tällä saa urlista parametrin

import Render from "../menuviews/render";

const SharedView = () => {
    const { id } = useParams();
    const [viewString, setViewString] = useState("");
    const [viewName, setViewName] = useState("");
    const [settings , setSettings] = useState("");

    
    useEffect(() => {
        console.log("SharedView.js: ", id);
        fetch("https://group3climatecharts.onrender.com/savedviews" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.text())
        .then(data => {
            setViewName(data.split("&&")[0]);  
            console.log("viewname on " + data.split("&&")[0]); // backend palauttaa stringin joka jaettu viidellä : merkillä
            setViewString(data.split("&&")[1]);
            console.log("viewstring on " + data.split("&&")[1]);
        }
        );
    }
    , [id]);

    useEffect(() => {
        if (viewString !== "") {
            setSettings(viewString);
        }
    }
    , [viewString]);




    

    return (
        <div className="frontpage">
            <h1>Here is a shared view by: {viewName}</h1>
          {viewString && <Render settings={settings} />}
        </div>
      );
    };

export default SharedView;