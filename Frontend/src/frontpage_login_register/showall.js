import React from "react";
import { Link } from "react-router-dom";
import Visual1 from "../Visual1/visual1.js"; 
import Visual2 from "../Visual2/visual2Chart";
import MyVisual3Chart from "../Visual3/visual3Chart";
import Visual4Chart from "../Visual4/visual4Chart";
import SectorChart from "../Visual5/sectorChart";


const ShowAll = () => {

    return (
        <div className="frontpage"> 
        
        <div className="frontpage"><h1>Here is all visuals listed</h1>
        <p>In this page you can see all of the charts. More info and source links are 
            visible by clicking the "Info" button below every chart.</p></div>
            <div><Visual1 /></div>
            <div><Visual2 /></div>
            <div><MyVisual3Chart /></div>
            <div><Visual4Chart/></div>
            <div><SectorChart /></div>
            <Link to="/"><button id="backtofront">Home</button></Link>
            
        </div>
    );

}

export default ShowAll;