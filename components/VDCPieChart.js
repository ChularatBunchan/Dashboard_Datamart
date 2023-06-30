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
    d3.csv("/VDC.csv").then((data) => {
      setData(data);
    });
  }, []);

  const dataSubService = data.map((element) => element.sub_service);
  const dataSum = data.map((element) => element.sum_amount);
  const dataDevice = data.map((element) => element.device);

  const countBySubService = {
    'MISTINE': 0,
    'BAACLOTTO': 0,
    'GETFRIEND': 0,
    'TMNEPIN': 0,
    'FOODCOURT_TOPUP': 0,
    "Top up TELCO": 0,
    "Transfer to Bank": 0,
    "3BBONLINE": 0,
    'SBMTOPUPWALLET': 0,
    'APLAY': 0,
    'SBMDIPCHIP': 0,
    "Top up Wallet": 0,
    "Bill Utility": 0,
    'SABUYWASH': 0,
    "Bill TELCO": 0,
    TMHMOBILE: 0,
    "RABBITCARD-SALE": 0,
    "RABBITCARD-REGISTER": 0,
    "Add Package": 0,
  };

  for (let i = 0; i < dataDevice.length; i++) {
    countBySubService[dataSubService[i]] += Number(dataSum[i]);
  }

  const labellajai = [
    "MISTINE",
    "BAACLOTTO",
    "GETFRIEND",
    "TMNEPIN",
    "FOODCOURT_TOPUP",
    "Top up TELCO",
    "Transfer to Bank",
    "3BBONLINE",
    "SBMTOPUPWALLET",
    "APLAY",
    "SBMDIPCHIP",
    "TopupWallet",
    "BillUtility",
    "SABUYWASH",
    "Bill TELCO",
    "TMHMOBILE",
    "RABBITCARD-SALE",
    "RABBITCARD-REGISTER",
    "Add Package",
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
                  "rgb(255, 67, 51, 0.3)",
                  "rgb(255, 159, 64,0.4)",
                  "rgb(255, 205, 86,0.4)",
                  "rgb(74, 191, 113,0.4)",
                  "rgb(75, 192, 192,0.4)",
                  "rgb(54, 162, 235,0.4)",
                  "rgb(51, 105, 255,0.4)",
                  "rgb(153, 102, 255,0.4)",
                  "rgb(255, 102, 254,0.4)",
                  "rgb(255, 51, 105,0.4)",
                ],
                borderColor: [
                  "rgb(255, 67, 51)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(74, 191, 113)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(51, 105, 255)",
                  "rgb(153, 102, 255)",
                  "rgb(255, 102, 254)",
                  "rgb(255, 51, 105)",
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
                  if (value > 50000) {
                    return labellajai[context.dataIndex];
                  }
                  return "";
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
