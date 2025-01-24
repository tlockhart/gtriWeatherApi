// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Search from "./components/inputs/Search";
import Submit from "./components/buttons/Submit";
import getCurrentForecast from "./utils/getCurrentForecast";
// import convertToFarenheit from "./utils/convertToFareheit";
import TemperatureChart from "./components/TemperatureChart";
import "./assets/css/style.css";
import LoadingSpinner from "./components/global/LoadingSpinner";

function App() {
  const [data, setData] = useState(null);
  const inputRef = useRef(null);
  const [displaySpinner, setDisplaySpinner] = useState(false);

  /**
   * Clear the text input and searchTerm
   **/
  const clearInput = () => {
    inputRef.current.value = "";
  };

  /**
   * Set url param values for fetch
   * @param {*} event
   */
  const handleDayClick = (event) => {
    event.preventDefault();
    setDisplaySpinner(true);
    const searchElement = inputRef.current;

    if (searchElement) {
      // Get CurrentForecast on click
      getCurrentForecast(searchElement.value.toLowerCase().trim())
        .then((res) => {
          const response = res.json();
          return response;
        })
        .then((data) => {
          const dataKeys = typeof Object.keys(data);
          // console.log("Data:", data, "dataKeys:", dataKeys);
            setData(data);
        }).catch((error) => {
          console.error("Error fetching forecast:", error);
          setData(null);
        })
        .finally(() => {
          setDisplaySpinner(false);
          clearInput();
        });;
    }
    // cleanup text input
    clearInput();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="station-search-form" onSubmit={handleDayClick}>
          <Search inputRef={inputRef} handleDayClick={handleDayClick} />
        </form>
      </header>
      {data && Object.keys(data).length > 1 ? (
        <TemperatureChart dataPoints={data} />
      ) : (
        <>
          <p>no results...</p>
          {displaySpinner ? (
            <div className="spinner-container">
              <LoadingSpinner width="150px" height="150px" />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
