import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Bar } from "react-chartjs-2";

export default function BarChartVDC() {
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

  const labels = [
    "VFE (ตู้น้ำ)",
    "VFS (ตู้ขนม)",
  ];

  const countAllSubservice = Object.values(countBySubService);

  return (
    <div style={{ width: "700px", height: "400px" }}>
      <div className="BarChartDay">
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                data: countAllSubservice,
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
