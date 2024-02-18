// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Text from "./components/inputs/Search";
import Submit from "./components/buttons/Submit";
import getDailyForecast from "./utils/getDailyForecast";
// import convertToFarenheit from "./utils/convertToFareheit";
import TemperatureChart from "./components/TemperatureChart";

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  /**
   * Clear the text input and searchTerm
   **/
  const clearInput = () => {
    inputRef.current.value = "";
    setSearchTerm("");
  };

  /**
   * Set url param values for fetch
   * @param {*} event
   */
  const handleDayClick = (event) => {
    event.preventDefault();
    if (searchTerm) {
      console.log("Event:", event.target, "SearchTerm:", searchTerm);
    }
    const searchElement = inputRef.current;

    if (searchElement) {
      console.log("Value:", searchElement.value);

      //Get Daily Forecast on click
      getDailyForecast(searchElement.value)
        .then((res) => {
          const response = res.json();
          return response;
        })
        .then((data) => {
          const dataKeys = typeof Object.keys(data);
          console.log("Data:", data, "dataKeys:", dataKeys);
          if (dataKeys.length > 1) {
            setData(data);
          } else {
            setData(data);
          }
        });
    }
    // cleanup text input
    clearInput();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="station-search" onSubmit={handleDayClick}>
          <Text inputRef={inputRef} />
          <Submit handleDayClick={handleDayClick} />
        </form>
      </header>

      <p>
        {!data || (data && !Object.keys(data))
          ? "no records..."
          : `StationId: ${data[0].stationId} , Current Temperature: ${data[0].temperature}`}
      </p>
      {data && Object.keys(data).length > 1 ? <TemperatureChart dataPoints={data}/> : <></>}
    </div>
  );
}

export default App;
