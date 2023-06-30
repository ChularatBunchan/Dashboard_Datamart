import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

export default function TestChart() {
  const [TimeAM, setTimeAM] = useState([]);
  const [TimePM, setTimePM] = useState([]);

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
    d3.csv("/pm.csv").then(setTimePM);
  }, []);
  console.log(TimeAM);
  console.log(TimePM);

  const dataX1 = [];
  const dataY1 = [];
  const dataY2 = [];

  TimeAM.map((element, index) => {
    dataX1[index] = element.service_product
    dataY1[index] = element.count
  });

  TimePM.map((element,index) => {
    dataY2[index]= element.count
  });
  
  console.log("dataX1", dataX1);
  console.log("dataY1", dataY1);
  console.log("dataY2", dataY2);

  //Data
  var defaultData = {
    labels: dataX1.slice(0,20),
    datasets: [
      {
        label: "AM",
        data: dataY1,
        backgroundColor: ["#FFC857"],
      },
      {
        label: "PM",
        backgroundColor: ["#564787"],
        data: dataY2,
      }
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0,
        fill: "start",
      },
      point: {
        radius: 0,
        hitRadius: 10,
      },
    },
    scales: {
      x: {
        display: true,
        // ticks: {
        //   color: "rgb(132, 181, 236)",
        // },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,

        grid: {
          display: false,
        },
        grace: '30%'
      },
    },
    plugins: {
      datalabels: {
        display: false,
        labels: dataY1,
        
      },
    },
  };
  

  return (
    <div className="test">
      <Line data={defaultData} options={options} height={70} width={150} ></Line>
    </div>
  );
}
