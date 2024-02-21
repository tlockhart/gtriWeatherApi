import convertToFarenheit from "./convertToFarenheit.js";
import constructRecords from "./contructRecords.js";

const getDailyForecast = async (
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
        results[resultsIndex] = constructRecords(
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
  }

  export default getDailyForecast;