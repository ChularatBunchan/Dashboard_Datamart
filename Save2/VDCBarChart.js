import React, { useEffect, useState } from "react";
import * as d3 from "d3";
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

export default function ChartVDC() {
  const [TimeDay, setTimeDay] = useState([]);

  useEffect(() => {
    d3.csv("/VDC.csv").then(setTimeDay);
  }, []);
  console.log(TimeDay);

  const dataService = TimeDay.slice(0, 10).map((element) => element.service);
  const dataSum = TimeDay.slice(0, 10).map((element) => element.count_amount);
  const dataDevice = TimeDay.slice(0, 10).map((element) => element.device);

  const labelsDevice = dataDevice;

  const labelsSer = dataService.map(
    (entity, index) => entity + " : " + dataDevice[index]
  );

  return (
    <div>
      <div className="BarChartDay">
        <Bar
          width={400}
          height={400}
          data={{
            labels: labelsSer,
            datasets: [
              {
                data: dataSum,
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
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
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
}
