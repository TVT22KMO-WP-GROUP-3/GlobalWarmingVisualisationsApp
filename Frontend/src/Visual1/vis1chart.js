import React,{useState, useEffect} from "react";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import Popup from 'reactjs-popup';


const Visual1Chart = () =>{ //haetaan käyrien tiedot ja muutetaan jsoniksi
    const [visual1Data, setVisual1Data] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/visual1")
        .then(response=>response.json())
        .then(result=>{
            let chartData = result.map((item)=>({x: item.year, y: item.anomaly}));
            setVisual1Data(chartData);
            console.log("globalannuual", chartData)

        })
        .catch(error=>console.log(error));
    
},[]);

const [nhannual1Data, setnhannualData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/nhannual")
        .then(response=>response.json())
        .then(result=>{
            let chartData = result.map((item)=>({x: item.year, y: item.anomaly}))
            setnhannualData(chartData)
        })
        .catch(error=>console.log(error));
    
},[]);

const [shannual1Data, setshannualData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/shannual")
        .then(response=>response.json())
        .then(result=>{
            let chartData = result.map((item)=>({x: item.year, y: item.anomaly}))
            setshannualData(chartData);
        })
        .catch(error=>console.log(error));
    
},[]);

const [recoData, setRecoData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/reconstruction")
        .then(response=>response.json())
        .then(result=>{
            let chartData = result.map((item)=>({x: item.year, y: item.value}))
            setRecoData(chartData);
        })
        .catch(error=>console.log(error));
    
},[]);


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

let chartData ={
    //labels: labels, //tässä annan x-akselin tiedot, eli vuodet 1850-2021
    datasets: [
        {
            label: "Global annual anomalies",
            data: visual1Data,
            parsing:{
                xAxisKey: "x"
            },
            borderColor:[
                "blue"
            ]
        },
        {
            label:"Northern annual anomalies",
            data: nhannual1Data,
            parsing: {
                xAxisKey: "x",
                yAxisKey: "y"
            },
            borderColor: [
                "yellow"
            ]
        },
        {
            label:"Southern annual anomalies",
            data: shannual1Data,
            parsing:{
                xAxisKey: "x",
                yAxisKey: "y"
            },
            borderColor: [
                "red"
            ]
            
        },
        {
            label:"Reconstruction",
            data: recoData,
            parsing:{
                xAxisKey: "x",
                yAxisKey: "y"
            },
            hidden: true, //defaulttina poissa näkyvistä
            borderColor: [
                "black"
            ],
            
            scales:{
                y:{
                    min: "1",
                    max: "1900"
                }
            }
            
            
            
        }
    ]
};

//const allData = [...visual1Data, ...nhannual1Data, ...shannual1Data, ...recoData];  // kaikki data yhteen taulukkoon
//let dates = [...new Set(allData.map(item => item.x))].sort((a, b) => a.localeCompare(b));

const options ={
    responsive: true,
    lineTension: 0,
    radius: 0,
    borderWidth: 1,
    plugins:{
        title:{
            display: true,
            text: "HadCRUT5 data: earth surface temperatures",
            font: {
                size: 20,
                weight: "bold",
                },
        }
    },
    scales:{
        x:{
            type: "time",
            time:{
                unit: "year",
            }
            
        },
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
export default Visual1Chart;