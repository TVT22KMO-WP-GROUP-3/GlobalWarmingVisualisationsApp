import React , {useState, useEffect} from 'react';  // tarviiko useRef?
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,} from 'chart.js';
import Popup from 'reactjs-popup';
import {DateTime} from 'luxon';
import './visual2.css';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,  // hoverinfo
Legend
);


const Visual2 = () => {
    const [annualChartData, setAnnualChartData] = useState([]);
    const [monthlyChartData, setMonthlyChartData] = useState([]);
    const [iceAge1Data, setIceAge1Data] = useState([]);
    const [iceAge2Data, setIceAge2Data] = useState([]);
    const [iceAge3Data, setIceAge3Data] = useState([]);

    function decimalYearConverter(decimalYear) {   // muuttaa desimaalivuoden joka monthlychartdatalla luxon DateTimeksi
        let year = Math.floor(decimalYear);
        let dayOfYear = Math.round((decimalYear - year) * 365);
        let date = DateTime.fromObject({ year, ordinal: dayOfYear });
        return date;
      }
      
      function yearToDate(year){            // muuttaa vuoden joka annualchartdatalla ja ice ageilla luxon DateTimeksi pvmäärällä 1.1
        let dayofYear = 1;
        let date = DateTime.fromObject({
          year, ordinal: dayofYear
        })
        return date;
      }
      



 useEffect(() => {   // Kaiken datan haku ja datan muokkaus x ja y arvoiksi, x arvojen muutto ISO muotoiseksi ja järjestys päivämäärän mukaan
    Promise.all([
    fetch("http://localhost:8080/v2annuals")
        .then(response => response.json())
        .then(result => {
            let chartData = result.map((item) => ({ x: yearToDate(item.year).toISODate(), y: item.mean }));
            chartData.sort((a, b) => DateTime.fromISO(a.x) - DateTime.fromISO(b.x));
            setAnnualChartData(chartData);
        }   
        ),
    fetch("http://localhost:8080/v2monthlys")
        .then(response => response.json())
        .then(result => {
            let chartData = result.map((item) => ({ x: decimalYearConverter(item.decimalyear).toISODate(), y: item.average }));
            chartData.sort((a, b) => DateTime.fromISO(a.x) - DateTime.fromISO(b.x));
            setMonthlyChartData(chartData);
        }
        ),
    fetch("http://localhost:8080/v2ice_age_1")
        .then(response => response.json())
        .then(result => {
            let chartData = result.map((item) => ({ x: yearToDate(item.year).toISODate(), y: item.co2 }));
            chartData.sort((a, b) => DateTime.fromISO(a.x) - DateTime.fromISO(b.x));
            setIceAge1Data(chartData);
        }
        ),
    fetch("http://localhost:8080/v2ice_age_2")
        .then(response => response.json())
        .then(result => {
            let chartData = result.map((item) => ({ x: yearToDate(item.year).toISODate(), y: item.co2 }));
            chartData.sort((a, b) => DateTime.fromISO(a.x) - DateTime.fromISO(b.x));
            setIceAge2Data(chartData);
        }
        ),
    fetch("http://localhost:8080/v2ice_age_3")
        .then(response => response.json())
        .then(result => {
            let chartData = result.map((item) => ({ x: yearToDate(item.year).toISODate(), y: item.co2 }));
            chartData.sort((a, b) => DateTime.fromISO(a.x) - DateTime.fromISO(b.x));
            setIceAge3Data(chartData);
        }
        ),
    ])
    .catch(error => console.log(error));
}, []);

const popUpText = (<div id='popup'>    
    <h1>About annual and monthly CO2 lines</h1>
    <p>NOAA's Earth System Research Laboratory (ESRL) Global Monitoring Division (GMD) measures atmospheric carbon dioxide (CO2) concentrations from several locations around the world. These measurements are critical for understanding the long-term trends and changes in the Earth's climate system, and help inform policy decisions related to mitigating and adapting to climate change. The GMD's data and research also provide valuable insights into the sources and sinks of CO2, and how different regions and ecosystems are affected by climate change. Learn more about the GMD's measurements and research at the link below.</p>
    <p id="link"><a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">About monthly and annual data</a></p>
    
    <h1>About Ice core lines</h1>
    <p>The line chart shows the concentration of carbon dioxide (CO2) in the atmosphere over time, as measured at the Law Dome ice core in Antarctica. The data is presented in several different ways, including monthly and annual averages, as well as measurements taken during previous ice ages. The chart illustrates how CO2 levels have fluctuated over thousands of years, with spikes during periods of increased volcanic activity and drops during periods of glaciation. In recent years, however, the chart shows a significant and unprecedented increase in CO2 levels, largely due to human activities such as burning fossil fuels.</p>
    <p id="link"><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html">About ice core data</a></p>
    
    <h2>Links to measurement data</h2>
    <p id="link"><a href="https://gml.noaa.gov/ccgg/trends/data.html">Monthly and Annual datasets</a> <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat">Ice core datasets</a></p>
    </div>);

// popuptextin sisältö

const allData = [...iceAge1Data, ...iceAge2Data, ...iceAge3Data, ...monthlyChartData, ...annualChartData];  // kaikki data yhteen taulukkoon
let dates = [...new Set(allData.map(item => item.x))].sort((a, b) => a.localeCompare(b)); // jotta saa kaikki päivämäärät yhteen taulukkoon ja järjestykseen
//const firstYear = dates[0];     // Todnäk turhia muuttujia, haettu raja arvojen muokkaukseen
// const lastYear =   dates[dates.length - 1];
let Options = {
    responsive: true,
    borderWidth: 1,
    radius: 0,
    maintainAspectRatio: true,
    plugins: {
        tooltip: {
            enabled: true,
            intersect: false,
            mode: 'index',
            position: 'nearest',
            callbacks: {    // hover efektin teksti ja parsinta
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';    // väliin : 
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y;  // ja perään y arvo
                    }
                    return label;
                }
            }
        },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'year', 
        },},
        y: {
            display: true,
            min: Math.min(...[...allData.map(item => item.y)].filter(y => y)),
            max: Math.max(...[...allData.map(item => item.y)].filter(y => y)),
        }
    },
      legend: {
        position: 'top',
      },
      title:{
        display: true,
        text: "Co2 levels and ice core thiccnesses",
        font: {
            size: 20,
            weight: "bold",
            },
    },
      grid: {
        drawOnChartArea: true,
      },
    }, 
  };
  
    let lineChartData = {  // linecharttiin menevä data, määrätään x ja y arvot jotka kaikissa datoissa yhtenäisiä
        labels: dates,
        datasets: [
            {
                label: 'CO2 Monthly',
                showLine: true,
                data: monthlyChartData.map(item => ({x: item.x, y: item.y})),
                borderColor: 'red',
            },
            {
                label: 'CO2 Annually',
                showLine: true,
                data: annualChartData.map(item => ({x: item.x, y: item.y})),
                borderColor: 'blue',
               
            },
            {
                label: 'Ice core 1',            // Ice coret defaulttina piilotettu
                showLine: true,
                hidden: true,
                data: iceAge1Data.map(item => ({x: item.x, y: item.y})),
                borderColor: 'green',
                
            },
            {
                label: 'Ice core 2',
                showLine: true,
                hidden: true,
                data: iceAge2Data.map(item => ({x: item.x, y: item.y})),
                borderColor: 'yellow',
            },
            {
                label: 'Ice core 3',
                showLine: true,
                hidden: true,
                data: iceAge3Data.map(item => ({x: item.x, y: item.y})),
                borderColor: 'orange',         
            },   
        ],
    };
   /* function logs (){
        console.log("iceAge1Data", iceAge1Data);
        console.log("iceAge2Data", iceAge2Data);
        console.log("iceAge3Data", iceAge3Data);
        console.log("monthlyChartData", monthlyChartData);
        console.log("annualChartData", annualChartData);

        console.log("Dates ", dates);
    }*/
    //logs();
   return (
        <div>
            <div className="chart">
            <Line data={lineChartData} options={Options} />
            <Popup trigger={<button id="exit">Info</button>} position="right center">
                <div>{popUpText}</div>
            </Popup>
            </div>
        </div>
    );
    }

 export default Visual2;

