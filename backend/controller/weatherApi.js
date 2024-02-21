import express from "express";
import convertToFarenheit from "../utils/convertToFarenheit.js";
import getDailyForecast from "../utils/getDailyForecast.js";
import constructRecords from "../utils/contructRecords.js";

export const WeatherApi = {
  /**
   * Get Todays Temperature by Day
   * @param {*} req
   * @param {*} res
   */
  getCurrentForecast: async (req, res) => {
    const { stationId } = req.params;
    // console.log("StationId:", stationId);
    const period = 7;
    const apiUrl = `https://api.weather.gov/stations/${stationId}/observations/latest?require_qc=false`;

   /******************************************
    * Get todays Temperature Date
    ******************************************/
    try {
      const currentForecastResponse = await fetch(apiUrl);

      if (!currentForecastResponse.ok) {
        throw new Error(
          `HTTP error! Status: ${currentForecastResponse.status}`
        );
      }
      const currentForecastData = await currentForecastResponse.json();
      const currentForecastRoot = currentForecastData.properties;
      const timeStamp = currentForecastRoot.timestamp;
      const currentTemp = currentForecastRoot.temperature.value;
      const farenheit = convertToFarenheit(currentTemp);
      const results = {};

      /******************************************
       * Create Current Temperature Record
       ******************************************/
      let currentForecast = constructRecords(
        timeStamp,
        farenheit,
        stationId
      );

      /*********************************************
       * Get the Forecast for the 6 previous days
       *********************************************/
      const previousDaysTotal = period - 1;
      
      await getDailyForecast(
        stationId,
        timeStamp,
        previousDaysTotal,
        results,
        currentForecast
      );
      /*************************************************/

      /*****************************
       * Return results as response
       ****************************/
      res.json(results);
    } catch (error) {
      console.error("Error fetching currentForecastData:", error);
      res.status(500).json({ 0: { temperature: "no records...", stationId } });
    }
  }
};
