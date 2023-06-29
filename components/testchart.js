import React from "react";
import Chart from "chart.js/auto";
// import axios from "axios";
// import { Line } from "react-chartjs-2";

// Chart.register(CategoryScale);
// Chart.register(...registerables);

(async function () {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  var myChart =  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
    layout: {
      padding: 20,
    },
  });
})();

export default function TestChart() {
  return (
    <>
      <canvas id="acquisitions"></canvas>
    </>
  );
}