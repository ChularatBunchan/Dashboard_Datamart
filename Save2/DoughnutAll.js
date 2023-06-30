import React, { useEffect, useState , Fragment } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Chart, ArcElement } from "chart.js";
import * as d3 from "d3";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register({
  ChartDataLabels,
  ArcElement,
});

export default function DoughnutAll() {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    d3.csv("/region.csv").then((data) => setTop10(data));
  }, []);

  const dataEntity = top10.map((element) => element.entity);
  const dataRegion = top10.map((element) => element.region);
  const dataCount = top10.map((element) => element.count);

  console.log(dataEntity);
  console.log(dataRegion);
  console.log(dataCount);

  var CountVDP = 0;
  var CountVDC = 0;

  for (let i = 0; i < 12; i++) {
    if (dataEntity[i] === "VDP") {
      CountVDP += Number(dataCount[i]);
    }
    if (dataEntity[i] === "VDC") {
      CountVDC += Number(dataCount[i]);
    }
  }
  const CountAll = CountVDP + CountVDC;
  const VDCpercent = ((CountVDC / CountAll) * 100).toFixed(2);
  const VDPpercent = ((CountVDP / CountAll) * 100).toFixed(2);

  var CountVDPsouth = 0;
  var CountVDPnorth = 0;
  var CountVDPcenter = 0;
  var CountVDPwest = 0;
  var CountVDPeast = 0;
  var CountVDPwestnortheast = 0;

  var CountVDCsouth = 0;
  var CountVDCnorth = 0;
  var CountVDCcenter = 0;
  var CountVDCwest = 0;
  var CountVDCeast = 0;
  var CountVDCwestnortheast = 0;
  var CountVDCnull = 0;

  for (let i = 0; i < 12; i++) {
    if (dataEntity[i] === "VDP") {
      if (dataRegion[i] === "ภาคใต้") {
        CountVDPsouth = ((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPsouth", CountVDPsouth);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDPnorth = ((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPnorth", CountVDPnorth);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDPcenter = ((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPcenter", CountVDPcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDPeast =((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPeast", CountVDPeast);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDPwestnortheast = ((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPwestnortheast", CountVDPwestnortheast);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDPwest = ((dataCount[i] / CountVDP) * 100 ).toFixed(2);
        console.log("CountVDPwest", CountVDPwest);
      }
    }
    if (dataEntity[i] === "VDC") {
      if (dataRegion[i] === "ภาคใต้") {
        CountVDCsouth =((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCsouth", CountVDCsouth);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDCnorth = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCnorth", CountVDCnorth);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDCcenter = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCcenter", CountVDCcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDCeast = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCeast", CountVDCeast);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDCwestnortheast = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCwestnortheast", CountVDCwestnortheast);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDCwest = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCwest", CountVDCwest);
      }
      if (dataRegion[i] === "NULL") {
        CountVDCnull = ((dataCount[i] / CountVDC) * 100 ).toFixed(2);
        console.log("CountVDCnull", CountVDCnull);
      }
    }
  }

  return (
    <div className="DouBox" style={{ width: "330px" , height: "330px"}}>
      <Doughnut
        data={{
          datasets: [
            {
              data: [
                CountVDPsouth,
                CountVDPnorth,
                CountVDPcenter,
                CountVDPeast,
                CountVDPwestnortheast,
                CountVDPwest,
              ],
              backgroundColor: ["rgb(255, 121, 119,0.5)"],
              circumference: (ctx) => {
                const total = [
                  ...ctx.chart.data.datasets[ctx.datasetIndex + 1].data,
                ].reduce((a, b) => parseInt(a) + parseInt(b), 0);
                console.log(total);
                const currentSegment =
                  ctx.chart.data.datasets[ctx.datasetIndex + 1].data[0];
                const radius = 360;
                const Percent = (radius * (currentSegment / total)).toFixed(2);
                console.log(Percent);
                return Percent;
              },
              children: [
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
                  backgroundColor: ["rgb(255, 223, 147,0.5)"],
                  circumference: (ctx) => {
                    const total = [
                      ...ctx.chart.data.datasets[ctx.datasetIndex + 1].data,
                    ].reduce((a, b) => parseInt(a) + parseInt(b), 0);
                    console.log(total);
                    const currentSegment =
                      ctx.chart.data.datasets[ctx.datasetIndex + 1].data[1];
                    const radius = 360;
                    const Percent = (radius * (currentSegment / total)).toFixed(2) ;
                    console.log(Percent);
                    return Percent;
                  },
                },
              ],
            },
            {
              data: [VDPpercent, VDCpercent],
              backgroundColor: ["rgb(255, 121, 119)" ,"rgb(255, 223, 147)"],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
              textAlign: "center",
              clamp: true,
            },
            textCenter: {
              beforeDraw(chart) {
                ctx.save();
                const { ctx } = chart;
                ctx.font = "bolder 30px sans-serif";
                ctx.fillStyle = "red";
                ctx.textBaseline = "middle";
                ctx.fillText(
                  "Value:",
                  165,
                  165
                );
                ctx.restore();

              },
            },
          },
        }}
      />
    </div>
  );
}
