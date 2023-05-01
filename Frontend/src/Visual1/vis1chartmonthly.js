import React,{useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import Popup from "reactjs-popup";


const Visual1ChartMonthly = () =>{
    const [visual1MoData, setVisual1MoData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/globalmonthly")
        .then(response=>response.json())
        .then(result=>{
            console.log(result);
            setVisual1MoData(result);
        })
        .catch(error=>console.log(error));
    
},[]);

const [nhmonthlyData, setnhmonthlyData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/nhmonthly")
        .then(response=>response.json())
        .then(result=>{
            console.log(result);
            setnhmonthlyData(result);
        })
        .catch(error=>console.log(error));
    
},[]);

const [shmonthlyData, setshmonthlyData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/shmonthly")
        .then(response=>response.json())
        .then(result=>{
            console.log(result);
            setshmonthlyData(result);
        })
        .catch(error=>console.log(error));
    
},[]);

const labels = visual1MoData.map(d => d.yearmo);
const temp = visual1MoData.map(t => t.anomaly);
const nhmotemp = nhmonthlyData.map(t => t.anomaly);
const shmotemp = shmonthlyData.map(t => t.anomaly);

const popUpText = (
    <div id="popup">
        <h1>About annual and monthly HadCRUT5 data</h1>
        <p>HadCRUT5 is a gridded dataset of global historical surface temperature anomalies relative to a 1961-1990 
            reference period. Data are available for each month from January 1850 onwards, on a 5 degree grid and as
             global and regional average time series. The dataset is a collaborative product of the Met Office Hadley
              Centre and the Climatic Research Unit at the University of East Anglia.
        </p>
        <p id="link"><a href ="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Source of HadCRUT5 data</a></p>

        <h1>About Reconstruction-data</h1>
        <p>Northern Hemisphere temperature reconstruction for the past 2,000 years by combining low-resolution 
            proxies with tree-ring data, using a wavelet transform technique to achieve 
            timescale-dependent processing of the data.</p>
            <p id="link"><a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005">Source of Reconstruction data</a></p>
            <p id="link"><a href="https://www.nature.com/articles/nature03265">Full study</a></p>
        
    </div>
);

const chartData ={
    labels: labels,
    datasets: [
        {
            label: "Global monthly anomalies",
            data: temp,
            borderColor:[
                "green"
            ]
        },
        {
            label: "Northern monthly anomalies",
            data: nhmotemp,
            borderColor:[
                "pink"
            ]
        },
        {
            label: "Southern monthly anomalies",
            data: shmotemp,
            borderColor:[
                "navy"
            ]
        }
    ]
};

const options ={
    responsive: true,
    lineTension: 0,
    radius: 0,
    borderWidth: 1,
    scales:{
        x:{
            type: "time",
            time:{
                unit: "month",
            }
        }
    }
}
return(
    <div className="chart">
        
            <Line options={options} data={chartData} width={1500} height = {800}/>
            <Popup trigger={<button id="exit">Info</button>} position="right center">
                <div>{popUpText}</div>
            </Popup>
        
    </div>
)
};
export default Visual1ChartMonthly;