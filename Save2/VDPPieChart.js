import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register({
  ChartDataLabels,
  ArcElement
});

const PieVDP = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/VDP.csv").then((data) => {
      setData(data);
    });
  }, []);

  const labelsSub = data.slice(0, 10).map((element) => element.sub_service);
  const dataCount = data.slice(0, 10).map((element) => element.count_amount);
  const dataDevice = data.slice(0, 10).map((element) => element.device);

  return (
    <div>
      <div className="BarChartDay">
        <Pie
          data={{
            startAngle: 240,
            labels: labelsSub,
            datasets: [
              {
                data: dataCount,
                backgroundColor:  
                ['rgb(255, 67, 51, 0.3)',
                'rgb(255, 159, 64,0.4)',
                'rgb(255, 205, 86,0.4)',
                'rgb(74, 191, 113,0.4)',
                'rgb(75, 192, 192,0.4)',
                'rgb(54, 162, 235,0.4)',
                'rgb(51, 105, 255,0.4)',
                'rgb(153, 102, 255,0.4)',
                'rgb(255, 102, 254,0.4)',
                'rgb(255, 51, 105,0.4)',],
                borderColor: [
                  'rgb(255, 67, 51)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(74, 191, 113)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(51, 105, 255)',
                  'rgb(153, 102, 255)',
                  'rgb(255, 102, 254)',
                  'rgb(255, 51, 105)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                clamp: true,
                color: "#000000",
                formatter: function (value, context) {
                  console.log(context.dataIndex);
                  return labelsSub[context.dataIndex] + " : " + dataDevice[context.dataIndex];
                },
              },
            },
            layout: {
              padding: {
                top: 5,
                left: 5,
                right: 5,
                bottom: 5,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieVDP;
