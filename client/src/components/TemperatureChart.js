import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const TemperatureChart = ({ dataPoints }) => {
  if (!dataPoints) {
    // Handle the case where dataPoints is null or undefined
    return null;
  }
  // Convert dataPoints object to an array
  const data = Object.values(dataPoints).map(({ date, temperature }) => ({
    date,
    temperature,
  }));

  return (
    <div className="bar-chart">
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TemperatureChart;
