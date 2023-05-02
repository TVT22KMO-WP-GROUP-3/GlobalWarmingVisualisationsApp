
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Popup from "reactjs-popup";
import axios from "axios";

const baseURL = "https://group3climatecharts.onrender.com"

const MyVisual3Chart = () => {
  const [carbonData, setCarbonData] = useState([]);
  const [gastData, setGastData] = useState([]);
  const [humanData, setHumanData] = useState([]);
  const [showHumanActions, setShowHumanActions] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/carbon`)
      .then(response => response.json())
      .then(result => {
        setCarbonData(result);
      })
      .catch(error => console.log(error));

      axios.get(`${baseURL}/gast`)
      .then(response => response.json())
      .then(result => {
        setGastData(result);
      })
      .catch(error => console.log(error));

      axios.get(`${baseURL}/humanactivities`)
      .then(response => response.json())
      .then(result => {
        setHumanData(result);
      })
      .catch(error => console.log(error));
  }, []);

  const getCombinedDataForChart = () => {
    const data = {
      labels: gastData.map(item => item.time),
      datasets: [
        {
          label: "Carbon data",
          yAxisID: "co2",
          data: carbonData.map(item => item.carbondioxide),
          borderColor: "#FF4136",
          backgroundColor: "rgba(255, 65, 54, 0.2)",
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
          pointBorderWidth: 0,
        },
      
        {
          label: "Global data",
          yAxisID: "temp",
          data: gastData.map(item => item.fifty),
          borderColor: "#0074D9",
          backgroundColor: "rgba(0, 116, 217, 0.2)",
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
          pointBorderWidth: 0,
        },
      ],
    };
    return data;
  };
    const options = {
      plugins: {
      legend: {
      position: "top",
      },
      title: {
      display: true,
      text: "Evolution of global temperature over the past two million years",
      font: {
      size: 20,
      weight: "bold",
      },
      },
      },
      scales: {
      y:{
        beginAtZero: true,
        type:"linear",
        position:"left",
        ticks:{
          display: false
        }
      },
      temp:{
        beginAtZero: true,
        type:"linear",
        position:"right"
      },
      x:{
          reverse: true,
      }
      },
      };
      
      const popuptext =(
        <div id="popup">
          <h1>Human Actions</h1>
      <ul>
      {humanData.map((item, index) => (
      <li key={index}>{item.event}</li>
      ))}
      </ul>
      <h1>Source links</h1>
      <p><a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">Harvard: Evolution of global temperature over the past two million years</a></p>
      <p><a href="http://carolynsnyder.com/publications.php">Dataset link</a></p>
        </div>
      );

      return (
      <div>
      <div className="chart">
      <Line data={getCombinedDataForChart()} options={options} />
      <div style={{ marginTop: "20px" }}>
      <div id="infotext"><p>Here is a line chart about global temperature and CO2 measurements from over 2 million years. There are
         also some human events that are connected to eather of those things and you can view them by pressing the button below. 
         Below is a link to the source of the info in this chart.</p>
      </div>
      </div>
      
      <Popup trigger={<button id="exit">Info</button>} position="right center">
                <div>{popuptext}</div>
            </Popup></div ></div>
      );
      };
      
      export default MyVisual3Chart;