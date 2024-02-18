import express from "express";

/*** */

export const WeatherApi = {
    getForecast: async (req, res) => {
    console.log("Got to getForecast service");
    res.json({ message: "Hello from server!" });
  }
}