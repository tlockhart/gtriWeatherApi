// Dependencies
/*************************/
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { WeatherApiRoutes } from "./backend/routes/index.js";

const app = express();

// Apply Cors middleware to allow requests from all origins
app.use(cors());

const PORT = 3001;

// import required modules
app.use(express.json({ limit: "5024mb" }));
app.use(express.urlencoded({ limit: "5024mb", extended: true }));

// Add routes, both API and view
// ************************************************
app.use('/api/weather', WeatherApiRoutes.getForecast);

app.use((req, res, next) => {
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
