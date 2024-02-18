import express from "express";
// import convertToFarenheit from "../utils/convertToFarenheit";
import convertToFarenheit from "./utils/convertToFarenheit.js";

/*** */

export const WeatherApi = {
  /**
   * Get Daily Forecast by Day
   * @param {*} req
   * @param {*} res
   */
  getCurrentForecast: async (req, res) => {
    const { stationId } = req.params;
    console.log("StationId:", stationId);

    const apiUrl = `https://api.weather.gov/stations/${stationId}/observations/latest?require_qc=false`;

    // Make Fetch request
    try {
      const currentForecastResponse = await fetch(apiUrl);

      if (!currentForecastResponse.ok) {
        throw new Error(`HTTP error! Status: ${currentForecastResponse.status}`);
      }
      const currentForecastData = await currentForecastResponse.json();

      const currentForecastRoot = currentForecastData.properties;
      const timeStamp = currentForecastRoot.timestamp;
      const currentTemp = currentForecastRoot.temperature.value;
      const farenheit = convertToFarenheit(currentTemp);
      const results = {};
      results[0] = WeatherApi.constructRecords(timeStamp, farenheit, stationId)
      /*********************************************
       * Get the Forecast for the past 7 days
       *********************************************/
      const totalDays = 3;
      const dailyForecast = await WeatherApi.getDailyForecast(
        stationId,
        timeStamp,
        totalDays
      );

      // console.log("Results:", dailyForecast);
      /************************************************ */
      const sevenDayRecord = Object.assign(dailyForecast, results)
      console.log("SevenDayRecord:", sevenDayRecord);
      // Handle the response data here
      res.json(sevenDayRecord);
    } catch (error) {
      console.error("Error fetching currentForecastData:", error);
      res
        .status(500)
        .json({ 0: { temperature: "no records...", stationId }});
    }
  },
  getDailyForecast: async (stationId, timestamp, totalDays) => {
    const originalTimestamp = new Date(timestamp);
    const modifiedTimestamp = new Date(originalTimestamp);

    const results = {};
    let count = 1;
    while (count < totalDays) {
      
      modifiedTimestamp.setDate(originalTimestamp.getDate() - count);

      const timestampNoOffset = modifiedTimestamp.toISOString().slice(0, -5) + "+00:00";
      console.log("modifiedTimestamp:", timestampNoOffset);
      console.log("StationID;", stationId);
      // Construct the URL with the received timeStamp
      const weatherApiUrl = `https://api.weather.gov/stations/${stationId}/observations/${timestampNoOffset}`;
      console.log("WeatherAPIURL:", weatherApiUrl);
      const dailyForecastResponse = await fetch(weatherApiUrl);

      if (!dailyForecastResponse.ok) {
        throw new Error(`HTTP error! Status: ${dailyForecastResponse.status}`);
      }

      const dailyForecastData = await dailyForecastResponse.json();
      const dailyForecastRoot = dailyForecastData.properties;
      const farenheit = convertToFarenheit(dailyForecastRoot.temperature.value)

      results[count] = WeatherApi.constructRecords(dailyForecastRoot.timestamp, farenheit, stationId);
      console.log("DailyForecast:", results[count]);
      count+=1;
    }
    return results;
  },
  constructRecords: (date, temperature, stationId) => {
    const tempObject = {
      date: date.split('T')[0],
      temperature,
      stationId
    }
    return tempObject;
  }
};
