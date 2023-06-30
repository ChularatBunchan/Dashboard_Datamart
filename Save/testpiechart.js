import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Legend, Tooltip, registerables, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(...registerables);

export default function TestPieChart() {
  const [TimeAM, setTimeAM] = useState([]);
  const [TimePM, setTimePM] = useState([]);
  const [defaultData, setDefaultData] = useState({
    labels: [],
    datasets: [
      {
        label: "AM",
        data: [],
      },
    ],
  });

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
    d3.csv("/pm.csv").then(setTimePM);
  }, []);

  useEffect(() => {
    const dataX1 = [];
    const dataY1 = [];

    TimePM.map((element, index) => {
      dataX1[index] = element.service_product;
      dataY1[index] = element.count;
    });

    const updatedData = {
      labels: dataX1.slice(0, 10),
      datasets: [
        {
          label: "PM",
          data: dataY1.slice(0, 10),
          backgroundColor: [
            "#57C4E5",
            "#4EC8B5",
            "#45CB85",
            "#A2CA6E",
            "#FFC857",
            "#F8B36B",
            "#F09D7E",
            "#E072A4",
            "#9B5D96",
            "#564787",
          ],
        },
      ],
    };
    setDefaultData(updatedData);
  }, [TimePM]);

  const CalfromAm = () => {
    const dataX1 = [];
    const dataY1 = [];

    TimeAM.map((element, index) => {
      dataX1[index] = element.service_product;
      dataY1[index] = element.count;
    });

    const updatedData = {
      labels: dataX1.slice(0, 10),
      datasets: [
        {
          label: "AM",
          data: dataY1.slice(0, 10),
          backgroundColor: [
            "#564787",
            "#9B5D96",
            "#E072A4",
            "#F09D7E",
            "#F8B36B",
            "#FFC857",
            "#A2CA6E",
            "#45CB85",
            "#4EC8B5",
            "#57C4E5",
          ],
        },
      ],
    };
    setDefaultData(updatedData);
  };

  const CalfromPm = () => {
    const dataX1 = [];
    const dataY1 = [];

    TimePM.map((element, index) => {
      dataX1[index] = element.service_product;
      dataY1[index] = element.count;
    });

    const updatedData = {
      labels: dataX1.slice(0, 10),
      datasets: [
        {
          label: "PM",
          data: dataY1.slice(0, 10),
          backgroundColor: [
            "#57C4E5",
            "#4EC8B5",
            "#45CB85",
            "#A2CA6E",
            "#FFC857",
            "#F8B36B",
            "#F09D7E",
            "#E072A4",
            "#9B5D96",
            "#564787",
          ],
        },
      ],
    };

    setDefaultData(updatedData);
  };

  const dataX1 = [];
  const dataY1 = [];

  TimePM.map((element, index) => {
    dataX1[index] = element.service_product;
    dataY1[index] = element.count;
  });

  const labels = dataX1.slice(0, 10);

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 14,
        },
        clamp: true,
        formatter: function (value, context) {
          console.log(context.dataIndex);
          if(context.dataIndex < 6 ){
            return labels[context.dataIndex];
          }
          return '';
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="buttonClass">
        <form className="buttonMid">
          <button type="button" id="am" onClick={CalfromAm}>
            AM
          </button>
          <span>|</span>
          <button type="button" id="pm" onClick={CalfromPm}>
            PM
          </button>
        </form>
      </div>

      <Pie data={defaultData} options={options}></Pie>
    </>
  );
}
