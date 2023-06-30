import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Pie } from "react-chartjs-2";
import { Chart, Legend, Tooltip, registerables, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(...registerables);

export default function PieVDC() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/VDP.csv").then((data) => {
      setData(data);
    });
  }, []);

  const dataSubService = data.map((element) => element.type_device);
  const dataSum = data.map((element) => element.sum_amount);
  const dataDevice = data.map((element) => element.device);

  const countBySubService = {
    'VFE': 0,
    'VFS': 0,
  };

  for (let i = 0; i < dataDevice.length; i++) {
    countBySubService[dataSubService[i]] += Number(dataSum[i]);
  }

  const labellajai = [
    "VFE",
    "VFS",
  ];

  const CountALLsubservice = Object.values(countBySubService);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <div className="BarChartDay">
        <Pie
          data={{
            labels: labellajai,
            datasets: [
              {
                data: CountALLsubservice,
                backgroundColor: [
                  "rgb(8, 128, 124,0.4)",
                  "rgb(244, 80, 95,0.4)",
                ],
                borderColor: [
                  "rgb(8, 128, 124)",
                  "rgb(244, 80, 95)",
                ],
                borderWidth: 2,
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
                    return labellajai[context.dataIndex];
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
}
