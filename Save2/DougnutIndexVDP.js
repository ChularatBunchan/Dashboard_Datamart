import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";
import { Chart, Legend, Tooltip, registerables, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
Chart.register(...registerables);

export function DoughnutIndexVDP() {
  const [selling, setSelling] = useState([]);

  useEffect(() => {
    d3.csv("/region.csv").then((data) => setSelling(data));
  }, []);

  const dataEntity = selling.map((element) => element.entity);
  const dataRegion = selling.map((element) => element.region);
  const dataCount = selling.map((element) => element.count);

  var CountVDP = 0;
  var CountVDC = 0;

  for (let i = 0; i < dataEntity.length; i++) {
    if (dataEntity[i] === "VDC") {
      CountVDC += Number(dataCount[i]);
    }
    if (dataEntity[i] === "VDP") {
      CountVDP += Number(dataCount[i]);
    }
  }

  const Countall = CountVDP + CountVDC;
  const VDPpercent = ((CountVDP / Countall) * 100).toFixed(2);

  var CountVDPsouth = 0;
  var CountVDPnorth = 0;
  var CountVDPcenter = 0;
  var CountVDPwest = 0;
  var CountVDPeast = 0;
  var CountVDPwestnortheast = 0;
  var CountVDPnull = 0;

  for (let i = 0; i < dataEntity.length; i++) {
    if (dataEntity[i] === "VDP") {
      if (dataRegion[i] === "ภาคใต้") {
        CountVDPsouth = ((dataCount[i] / CountVDP) * 100).toFixed(2);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDPnorth = ((dataCount[i] / CountVDP) * 100).toFixed(2);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDPcenter = ((dataCount[i] / CountVDP) * 100).toFixed(2);
        console.log("CountVDPcenter", CountVDPcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDPeast = ((dataCount[i] / CountVDP) * 100).toFixed(2);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDPwestnortheast = ((dataCount[i] / CountVDP) * 100).toFixed(2);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDPwest = ((dataCount[i] / CountVDP) * 100).toFixed(2);
      }
      if (dataRegion[i] === "NULL") {
        CountVDPnull = ((dataCount[i] / CountVDP) * 100).toFixed(2);
        console.log("CountVDPnull", CountVDPnull);
      }
    }
  }
  var CountAll = [
    CountVDPsouth,
    CountVDPnorth,
    CountVDPcenter,
    CountVDPeast,
    CountVDPwestnortheast,
    CountVDPwest,
    CountVDPnull,
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
          CountVDPsouth,
          CountVDPnorth,
          CountVDPcenter,
          CountVDPeast,
          CountVDPwestnortheast,
          CountVDPwest,
          CountVDPnull,
        ],
        backgroundColor: [
          "rgba(253, 201, 33, 0.4)",
          "rgba(253, 216, 93, 0.4)",
          "rgba(244, 156, 187, 0.4)",
          "rgba(242, 106, 141, 0.4)",
          "rgba(221, 45, 74, 0.4)",
          "rgba(136, 13, 30, 0.4)",
          "rgba(194,194,194,0.2)"
        ],
        borderColor: [
          "rgba(253, 201, 33, 1)",
          "rgba(253, 216, 93, 1)",
          "rgba(244, 156, 187, 1)",
          "rgba(242, 106, 141, 1)",
          "rgba(221, 45, 74, 1)",
          "rgba(136, 13, 30, 1)",
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
        clamp: true,
        formatter: function (value, context) {
          console.log(context.dataIndex);
          if (value > 5) {
            return CountAll[context.dataIndex] + "%";
          }
          return "";
        },
      },
    },
  };

  return (
    <div style={{ width: "315px", height: "315px" , position: "relative" }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "55%",
          left: 0,
          textAlign: "center"
        }}
      >
      <span>VDP</span><br />
      <span>{VDPpercent}%</span>
      </div>
      <br />
      <center>
        <h4 style={{ color: "rgba(221, 45, 74, 1)" }}>VDP value by location</h4>
      </center>
    </div>
  );
}
