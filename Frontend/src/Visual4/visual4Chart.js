import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Popup from 'reactjs-popup';
import axios from 'axios';

const baseURL = "https://group3climatecharts.onrender.com"

const Visual4Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState(['albania', 'algeria', 'angola']);
  const [allCountries, setAllCountries] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      try {
        const response = await axios.get(`${baseURL}/v4data`);
        const rawData = await response.text();

        const lastChar = rawData[rawData.length - 1];
        let fixedData;

        if (lastChar === '}' || lastChar === ']') {
          fixedData = rawData;
        } else {
          fixedData = rawData.trim() + '}';
        }

        const data = JSON.parse(fixedData);
        const allCountries = Object.keys(data[0]).filter(key => key !== 'year');

        setChartData(data);
        setAllCountries(allCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndCreateChart();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      const datasets = selectedCountries.map((country, index) => ({
        label: country,
        data: chartData.map(item => item[country]),
        borderColor: `hsl(${360 / selectedCountries.length * index}, 100%, 50%)`,
        fill: false,
      }));

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(item => item.year),
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      chartInstanceRef.current = chart;
    }
  }, [chartData, selectedCountries]);

  const handleCountryChange = (event) => {
    const { value } = event.target;
    setSelectedCountries(prevState => {
      if (prevState.includes(value)) {
        return prevState.filter(country => country !== value);
      }
      return [...prevState, value];
    });
  };

  const handleClearCountries = () => {
    setSelectedCountries([]);
  };
  
  const popuptext=(<div id="popup">
    <h1>Visual 4 Information</h1>
    <p>This paper aims to provide insights into the global carbon budget, which refers to the changes in carbon dioxide in the environment since the beginning of the Industrial Era. The focus is on CO2 emissions resulting from human activities such as burning fossil fuels and land-use changes, as well as the resulting changes in carbon storage in the land and ocean. Additionally, the paper provides annual estimates of CO2 uptake by the ocean and land. However, global emissions and their partitioning among the atmosphere, ocean, and land may not necessarily add up to zero due to errors and smaller terms that are not fully accounted for in the budget estimate. To address this, the paper also considers budget imbalance, which is a measure of the mismatch between estimated emissions and changes in the atmosphere, land, and ocean. Understanding the global carbon budget and its components is essential for quantifying emissions that are compatible with climate stabilization goals.</p>
    <p><a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D">Dataset link</a></p>
    <p><a href="https://essd.copernicus.org/articles/14/1917/2022/">Source link</a></p>
  </div>);

  return (
    <div>
      <div className="chart">
        {chartData && (
          <Line
            data={{
              labels: chartData.map(item => item.year),
              datasets: selectedCountries.map((country, index) => ({
                label: country,
                data: chartData.map(item => item[country]),
                borderColor: `hsl(${360 / selectedCountries.length * index}, 100%, 50%)`,
                fill: false,
              })),
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        )}
        <select onChange={handleCountryChange}>
          <option>Select a country</option>
          {allCountries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <button onClick={handleClearCountries}>Clear Countries</button>
      <div style={{ marginTop: '20px' }}>
        <div id="infotext">
          <p>
            Here is a line chart showing selected countries co2 data. You can select multiple countries to compare their data.
          </p>
        </div>
      </div>
      <Popup trigger={<button id="exit">Info</button>} position="right center">
        <div>{popuptext}</div>
      </Popup>
    </div></div>
  );
}; 

export default Visual4Chart;
