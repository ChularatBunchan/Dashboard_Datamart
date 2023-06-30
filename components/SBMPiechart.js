import React, { useEffect , useState} from "react";
import * as d3 from "d3";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register({
  ChartDataLabels,
  ArcElement
});

export default function PieSBM() {
  const [TimeDay, setTimeDay] = useState([]);

  useEffect(() => {
    d3.csv("/SBM.csv").then(setTimeDay);
  }, []);
  console.log(TimeDay);

  const dataService = TimeDay.slice(0, 10).map((element) => element.service);
  const dataSum = TimeDay.slice(0, 10).map((element) => element.count_amount);
  const dataDevice = TimeDay.slice(0, 10).map((element) => element.device);

  const labelsDevice = dataDevice;

  const labelsSer = dataService.map(
    (entity, index) => entity + " " + dataDevice[index]
  );

  return (
    <div>
      <div className="BarChartDay">
        <Pie
          data={{
            labels: labelsSer,
            datasets: [
              {
                data: dataSum,
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
                display: false
              },
              datalabels: {
                clamp: true,
                color: "#000000",
                formatter: function (value, context) {
                  if(context.dataIndex < 1 ){
                    return labelsSer[context.dataIndex];
                  }
                  return '';
                }
              }
            },
            layout: {
              padding: {
                top: 5,
                left: 5,
                right: 5,
                bottom: 5
              }
            }
          }}
        />
      </div>
    </div>
  );
}
