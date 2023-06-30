import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  registerables,
} from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

Chart.register(
  CategoryScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
Chart.register(...registerables);

export default function ChartDay() {
  const [TimeDay, setTimeDay] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sunday");

  useEffect(() => {
    d3.csv("/Day.csv").then(setTimeDay);
  }, []);

  console.log(TimeDay);

  const dataDOW = [];
  const dataC = [];
  const dataP = [];

  TimeDay.map((element, index) => {
    dataDOW[index] = element.day_of_week;
    dataC[index] = element.count;
    dataP[index] = element.Product;
  });

  console.log("dataX1", dataDOW);
  console.log("dataY1", dataC);
  console.log("dataY2", dataP);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredDataC = [];
  const filteredDataP = [];

  for (let i = 0; i < dataDOW.length; i++) {
    let dataDOWMost = "";
    switch (dataDOW[i]) {
      case "0":
        dataDOWMost = "Sunday";
        break;
      case "1":
        dataDOWMost = "Monday";
        break;
      case "2":
        dataDOWMost = "Tuesday";
        break;
      case "3":
        dataDOWMost = "Wednesday";
        break;
      case "4":
        dataDOWMost = "Thursday";
        break;
      case "5":
        dataDOWMost = "Friday";
        break;
      case "6":
        dataDOWMost = "Saturday";
        break;
      default:
        break;
    }
    if (dataDOWMost === selectedOption) {
      filteredDataC.push(dataC[i]);
      filteredDataP.push(dataP[i]);
    }
  }

  console.log("filteredDataC", filteredDataC);
  console.log("filteredDataP", filteredDataP);

  return (
    <div >
      <FormControl sx={{ m: 1, minWidth: 108, backgroundColor: "white" }}>
        <InputLabel>Days</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={selectedOption}
          onChange={handleOptionChange}
          autoWidth
          label="Day"
        >
          <MenuItem value="Sunday">Sunday</MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
        </Select>
      </FormControl>
      <div className="BarChartDay">
        <Bar
          data={{
            labels: filteredDataP.slice(0, 20),
            datasets: [
              {
                label: "Transaction Count",
                data: filteredDataC.slice(0, 20),
                backgroundColor: "rgb(132, 181, 236)",
                borderWidth: 1,
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
