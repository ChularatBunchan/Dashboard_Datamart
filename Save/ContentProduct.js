import React, { useState, useEffect } from "react";
import TestChart from "./testchart";
import TestPieChart from "./testpiechart";
import * as d3 from "d3";
import ChartDay from "./ChartDay";
import TableDay from "./TableDay";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ContentProduct() {
  const [TimeAM, setTimeAM] = useState([]);
  const [TimePM, setTimePM] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
    d3.csv("/pm.csv").then(setTimePM);
  }, []);

  var BestCam = [];
  var BestPam = [];
  var BestCpm = [];
  var BestPpm = [];

  TimeAM.map((elements, index) => {
    BestCam[index] = elements.count;
    BestPam[index] = elements.service_product;
  });

  TimePM.map((elements, index) => {
    BestCpm[index] = elements.count;
    BestPpm[index] = elements.service_product;
  });

  console.log("from best Count", BestCpm);
  console.log("from best Count", BestCam);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <header>
        <div className="title">
          <h1>Product Overview</h1>
        </div>
      </header>
      <div className="content">
        <div className="conwrapper">
          <FormControl sx={{ m: 1, minWidth: 150 , backgroundColor: "aliceblue"}}>
            <InputLabel>
              Time
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              value={selectedOption}
              onChange={handleOptionChange}
              autoWidth
              label="Age"
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>

          <div className="tabs">
            <div className="categories">
              <h1 id="texth1">Best seller :</h1>
              <form>
                <input
                  type="text"
                  disabled="disabled"
                  value={
                    selectedOption === "AM"
                      ? BestPam.slice(0, 1)
                      : BestPpm.slice(0, 1)
                  }
                ></input>
              </form>
            </div>
          </div>

          <div className="tabs">
            <div className="categories">
              <h1 id="texth1">Product : </h1>
              <form>
                <input
                  type="text"
                  value={
                    selectedOption === "AM"
                      ? BestCam.slice(0, 1)
                      : BestCpm.slice(0, 1)
                  }
                  disabled="disabled"
                ></input>
              </form>
            </div>
          </div>
        </div>
        {/* CHART day*/}
        <div className="charts">
          <div className="chart1">
            <div className="bar">
              <h2> Transaction AM and PM </h2>
              <div className="Mchart">
                <TestChart />
              </div>
            </div>
          </div>
          <div className="chart2">
            <div className="bar">
              <h2>Top 10 best Selling</h2>
              <div className="PieChart">
                <div id="Pie">
                  <TestPieChart />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART day of week */}
        <div className="charts">
          <div className="chart1">
            <div className="bar">
              <h2>Best Selling Day of the week</h2>
              <div className="BarChart">
                <ChartDay />
              </div>
            </div>
          </div>

          <div className="chart2">
            <div className="bar">
              <div className="BarChart">
                <TableDay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
