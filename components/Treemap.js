import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Chart, ArcElement } from "chart.js";
import * as d3 from "d3";
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register({
  ChartDataLabels,
  ArcElement,
  TreemapController,
  TreemapElement
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
        CountVDPsouth = dataCount[i] ;
        console.log("CountVDPsouth", CountVDPsouth);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDPnorth = dataCount[i] ;
        console.log("CountVDPnorth", CountVDPnorth);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDPcenter = dataCount[i] ;
        console.log("CountVDPcenter", CountVDPcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDPeast = dataCount[i] ;
        console.log("CountVDPeast", CountVDPeast);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDPwestnortheast = dataCount[i] ;
        console.log("CountVDPwestnortheast", CountVDPwestnortheast);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDPwest = dataCount[i] ;
        console.log("CountVDPwest", CountVDPwest);
      }
    }
    if (dataEntity[i] === "VDC") {
      if (dataRegion[i] === "ภาคใต้") {
        CountVDCsouth = dataCount[i] ;
        console.log("CountVDCsouth", CountVDCsouth);
      }
      if (dataRegion[i] === "ภาคเหนือ") {
        CountVDCnorth = dataCount[i] ;
        console.log("CountVDCnorth", CountVDCnorth);
      }
      if (dataRegion[i] === "ภาคกลาง") {
        CountVDCcenter = dataCount[i] ;
        console.log("CountVDCcenter", CountVDCcenter);
      }
      if (dataRegion[i] === "ภาคตะวันออก") {
        CountVDCeast = dataCount[i] ;
        console.log("CountVDCeast", CountVDCeast);
      }
      if (dataRegion[i] === "ภาคตะวันออกเฉียงเหนือ") {
        CountVDCwestnortheast = dataCount[i] ;
        console.log("CountVDCwestnortheast", CountVDCwestnortheast);
      }
      if (dataRegion[i] === "ภาคตะวันตก") {
        CountVDCwest = dataCount[i] ;
        console.log("CountVDCwest", CountVDCwest);
      }
      if (dataRegion[i] === "NULL") {
        CountVDCnull = dataCount[i] ;
        console.log("CountVDCnull", CountVDCnull);
      }
    }
  }

  function colorFromRaw(ctx) {
    if (ctx.type !== 'data') {
      return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color = 'green';
    return helpers.color(color)
      .alpha(alpha)
      .rgbString();
  }

  return (
    <div className="DouBox" style={{height: "400px"}}>
      <Chart
        data={{
          datasets: [
            {
              label:['VDC','VDP'],
              tree: [
                CountVDPsouth,
                CountVDPnorth,
                CountVDPcenter,
                CountVDPeast,
                CountVDPwestnortheast,
                CountVDPwest,
              ],
              backgroundColor: ["rgb(255, 121, 119,0.5)"],
              spacing: 0,
              backgroundColor: (ctx) => colorFromRaw(ctx),
            },
          ],
        }}
        options={{
          type: 'treemap',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'My treemap chart'
            },
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
              textAlign: "center",
              clamp:true,
              formatter: function(value , context){
                return value
              }
            },
          },
        }}
      />
    </div>
  );
}
