import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import { rgbToRGBA } from "../utils/rgbToRGBA";
import colors from "../assets/scss/_variables.scss";
import { CategoryScale, Chart, registerables, Filler } from "chart.js";

Chart.register(CategoryScale, ...registerables, Filler);

const TemperatureChart = ({ dataPoints }) => {
  if (!dataPoints) {
    // Handle the case where dataPoints is null or undefined
    return null;
  }
  // Convert dataPoints object into two arrays: dates and temperatures
  const dates = Object.keys(dataPoints).map((key) => dataPoints[key].date);
  const temperatures = Object.keys(dataPoints).map(
    (key) => dataPoints[key].temperature
  );
  // console.log("Date:", dates, "Temperature:", temperatures);

  let data = {
    labels: dates,
    datasets: [
      {
        label: "Temperature in °F",
        data: temperatures,
        backgroundColor: rgbToRGBA(colors.tertiary, 0.5),
        borderColor: rgbToRGBA(colors.tertiaryDark, 0.5),
        pointBorderColor: rgbToRGBA(colors.tertiaryDark, 0.5),
        pointBackgroundColor: rgbToRGBA(colors.tertiaryDark, 0.5),
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(255, 0, 0, 0.3)",
        },
      },
    ],
  };

  return (
    <Card
      title={`${dataPoints[
        dates.length
      ].stationId.toUpperCase()} Temperature Trends, Current Temp (${
        dataPoints[dates.length].temperature
      } °F)`}
      id="metrics"
    >
      <Line
        data={data}
        options={{
          responsive: true,
          tension: 0.3,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                fontColor: rgbToRGBA(colors.text, 1),
              },
              gridLines: {
                display: false,
              },
            },
            y: {
              ticks: {
                fontColor: rgbToRGBA(colors.text, 1),
                // Include a dollar sign and commas in tickets
                callback: function (value, index, values) {
                  return value.toFixed() + "°F";
                },
                // stepSize: 200, // Adjust the space between ticks on the y-axis
              },
            },
          },
        }}
      />
    </Card>
  );
};

export default TemperatureChart;
