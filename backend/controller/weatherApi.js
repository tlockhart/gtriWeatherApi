import express from "express";
import convertToFarenheit from "../utils/convertToFarenheit.js";

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
      let currentForecast = WeatherApi.constructRecords(
        timeStamp,
        farenheit,
        stationId
      );

      /*********************************************
       * Get the Forecast for the 6 previous days
       *********************************************/
      const previousDaysTotal = period - 1;
      
      await WeatherApi.getDailyForecast(
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
  },
  getDailyForecast: async (
    stationId,
    timestamp,
    previousDaysTotal,
    results,
    currentForecast
  ) => {
    const originalTimestamp = new Date(timestamp);
    const modifiedTimestamp = new Date(originalTimestamp);
    let resultsIndex = 0; // Track the index independently

    let count = previousDaysTotal;
    // console.log("Count:", count);
    while (count > 0) {
      modifiedTimestamp.setDate(originalTimestamp.getDate() - count);

      const timestampNoOffset =
        modifiedTimestamp.toISOString().slice(0, -5) + "+00:00";

      // Construct the URL with the received timeStamp
      const weatherApiUrl = `https://api.weather.gov/stations/${stationId}/observations/${timestampNoOffset}`;

      try {
        /*****************************************
         * Fetch the New Record
         *****************************************/
        const dailyForecastResponse = await fetch(weatherApiUrl);

        if (!dailyForecastResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${dailyForecastResponse.status}`
          );
        }
        const dailyForecastData = await dailyForecastResponse.json();
        const dailyForecastRoot = dailyForecastData.properties;
        const farenheit = convertToFarenheit(
          dailyForecastRoot.temperature.value
        );

        // Add 6 previousDay records to results Object
        results[resultsIndex] = WeatherApi.constructRecords(
          dailyForecastRoot.timestamp,
          farenheit,
          stationId
        );
        resultsIndex += 1; // Increment the index
      } catch (error) {
        // Log the error and continue to the next iteration
        console.error(`Error fetching daily forecast for ${timestampNoOffset}:`, error);
      }
      // console.log("Count:", count, "DailyForecast:", results[count]);
      count -= 1;
    } // while
    // add todays forecast at the end
    results[resultsIndex + 1] = currentForecast
    return results;
  },
  constructRecords: (date, temperature, stationId) => {
    const tempObject = {
      date: date.split("T")[0],
      temperature,
      stationId,
    };
    return tempObject;
  },
};
