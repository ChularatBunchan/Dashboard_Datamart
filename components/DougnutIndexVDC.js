import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";
import { Chart, Legend, Tooltip, registerables, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(...registerables);

export function DoughnutIndexVDC() {
  const [selling, setSelling] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    d3.csv("/region.csv").then((data) => setSelling(data));
  }, []);

  const dataEntity = selling.map((element) => element.entity);
  const dataRegion = selling.map((element) => element.region);
  const dataCount = selling.map((element) => element.count);

  var CountVDC = 0;
  var CountVDP = 0;

  for (let i = 0; i < dataEntity.length; i++) {
    if (dataEntity[i] === "VDC") {
      CountVDC += Number(dataCount[i]);
    }
    if (dataEntity[i] === "VDP") {
      CountVDP += Number(dataCount[i]);
    }
  }

  console.log("CountVDC ==>" ,CountVDC)
  console.log("CountVDP ==>" ,CountVDP)

  const Countall = CountVDP + CountVDC;
  const VDCpercent = ((CountVDC / Countall) * 100).toFixed(2);

  var CountVDCsouth = 0;
  var CountVDCnorth = 0;
  var CountVDCcenter = 0;
  var CountVDCeast = 0;
  var CountVDCwestnortheast = 0;
  var CountVDCwest = 0;
  var CountVDCnull = 0;

  for (let i = 0; i < dataEntity.length; i++) {
    if (dataEntity[i] === "VDC") {
      if (dataRegion[i] === "ภาคใต้") {
        CountVDCsouth = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCsouth", CountVDCsouth);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDCnorth = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCnorth", CountVDCnorth);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDCcenter = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCcenter", CountVDCcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDCeast = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCeast", CountVDCeast);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDCwestnortheast = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCwestnortheast", CountVDCwestnortheast);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDCwest = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCwest", CountVDCwest);
      }
      if (dataRegion[i] === "NULL") {
        CountVDCnull = ((dataCount[i] / CountVDC) * 100).toFixed(2);
        console.log("CountVDCnull", CountVDCnull);
      }
    }
  }
  var CountAll = [
    CountVDCsouth,
    CountVDCnorth,
    CountVDCcenter,
    CountVDCeast,
    CountVDCwestnortheast,
    CountVDCwest,
    CountVDCnull,
  ];

  const data = {
    labels: [
      "ภาคใต้",
      "ภาคเหนือ",
      "ภาคกลาง",
      "ภาคตะวันออก",
      "ภาคตะวันออกเฉียงเหนือ",
      "ภาคตะวันตก",
      "null(0,0)"
    ],
    datasets: [
      {
        data: [
          CountVDCsouth,
          CountVDCnorth,
          CountVDCcenter,
          CountVDCeast,
          CountVDCwestnortheast,
          CountVDCwest,
          CountVDCnull,
        ],
        backgroundColor: [
          "rgba(253, 201, 33, 0.2)",
          "rgba(253, 216, 93, 0.2)",
          "rgba(203, 215, 164, 0.2)",
          "rgba(153, 214, 234, 0.2)",
          "rgba(128, 183, 213, 0.2)",
          "rgba(103, 152, 192, 0.2)",
          "rgba(194,194,194,0.2)"
        ],
        borderColor: [
          "rgba(253, 201, 33, 1)",
          "rgba(253, 216, 93, 1)",
          "rgba(203, 215, 164, 1)",
          "rgba(153, 214, 234, 1)",
          "rgba(128, 183, 213,1)",
          "rgba(103, 152, 192,1)",
          "rgba(194,194,194,1)"
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        font: {
          size: 14,
        },
        // align: 'end',
        // anchor: 'end',
        formatter: function (value, context) {
          if(value > 7){
            return CountAll[context.dataIndex] + "%";
          }
          return ''
        },
      },
    },
  };

  return (
    <>
    <div style={{ width: "315px", height: "315px", position: "relative", gap: "2rem" }}>
      <Doughnut ref={chartRef} data={data} options={options} />
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "55%",
          left: 0,
          textAlign: "center"
        }}
      >
      <span>VDC</span><br />
      <span>{VDCpercent}%</span>
      </div>
      <br />
      <center>
        <h4 style={{ color: "rgba(103, 152, 192,1)" }}>VDC value by location</h4>
      </center>
    </div>
    </>
    
  );
}
