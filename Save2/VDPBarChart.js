import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  registerables,
} from "chart.js";

Chart.register(
  CategoryScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
Chart.register(...registerables);

const BarChartVDP = ({ data }) => {
  const labelsSub = data.map((element) => element.sub_service).slice(0, 21);
  const labelsDevice = data.map((element) => element.device).slice(0, 21);
  const labelsMerged = labelsSub.map(
    (label, index) => `${label} : ${labelsDevice[index]}`
  );

  const dataCount = data.map((element) => element.count_amount);

  return (
    <div>
      <div className="BarChartDay">
        <Bar
          data={{
            labels: labelsMerged,
            datasets: [
              {
                data: dataCount,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132)",
                  "rgba(255, 159, 64)",
                  "rgba(255, 205, 86)",
                  "rgba(75, 192, 192)",
                  "rgba(54, 162, 235)",
                  "rgba(153, 102, 255)",
                  "rgba(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChartVDP;
