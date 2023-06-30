import React, { useState, useEffect } from "react";
import ChartDay from "./VDPBarChart";
import TestPieChart from "./VDCPieChart";
import * as d3 from "d3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import ChartSBM from "./SBMBarchart";
import PieSBM from "./SBMPiechart";
import TableTop10All from "./SBMTable";

export default function ContentMoney() {
  const [TimeAM, setTimeAM] = useState([]);
  const [TimePM, setTimePM] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [showTable, setShowTable] = useState(true); // State for showing table
  const [showPie, setShowPie] = useState(false); // State for showing pie chart
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    d3.csv("/VDC.csv").then(setTimeAM);
    d3.csv("/VDP.csv").then(setTimePM);
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

  const handleShowTable = () => {
    setShowTable(true);
    setShowPie(false);
    setActiveButton("table");
  };

  const handleShowPie = () => {
    setShowPie(true);
    setActiveButton("pie");
    setShowTable(false);
  };

  return (
    <div>
      <header>
        <div className="title">
          <img style={{ width: "8rem"}}  src="logo_SabuyMoney.png" />
          <h2 style={{color: "#33A752"}}>Sabuy Money</h2>
        </div>
      </header>
      <div className="content">
        {/* <div className="conwrapper">
          <FormControl
            sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}
          >
            <InputLabel id="time-period-label">Month</InputLabel>
            <Select
              labelId="time-period-label"
              value={selectedOption}
              onChange={handleOptionChange}
              autoWidth
              label="Time"
            >
              <MenuItem value="alltime">All time</MenuItem>
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="December">December</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}
          >
            <InputLabel id="day-label">Day</InputLabel>
            <Select
              labelId="day-label"
              value={selectedOption}
              onChange={handleOptionChange}
              autoWidth
              label="Day"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="WeekDay">Week day</MenuItem>
              <MenuItem value="Weekend">Weekend</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}
          >
            <InputLabel id="day-night-label">Day or Night</InputLabel>
            <Select
              labelId="day-night-label"
              value={selectedOption}
              onChange={handleOptionChange}
              autoWidth
              label="Day and Night"
            >
              <MenuItem value="Alltime">All time</MenuItem>
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
              <MenuItem value="Night">Early Morning</MenuItem>
            </Select>
          </FormControl>

          <Button className="button">Calculate</Button>
        </div> */}

        {/* CHART day*/}

        <span id="SPAN"> </span>

        <div className="charts">
          <div className="chart1" style={{ width: "800px", height: "500px" }}>
            <div className="bar">
              <h2>Product Transaction </h2>
              <div className="Mchart">
                <ChartSBM />
              </div>
            </div>
          </div>

          <div className="chart2" style={{ width: "800px", height: "500px" }}>
            <div className="bar">
              <div className="Butt">
                <Button
                  onClick={handleShowTable}
                  className={activeButton === "table" ? "active" : ""}
                >Table</Button>
                <Button 
                  onClick={handleShowPie}
                  className={activeButton === "pie" ? "active" : ""}
                > Pie</Button>
              </div>

              <h2>Top 10 best Seller</h2>
              {showPie && (
                <center style={{ width: "650px" }}>
                    <div className="Pietop10">
                      <PieSBM style={{ width: "60rem" ,height: "60rem" }} />
                    </div>
                </center>
              )}
              {showTable && (
                <div className="tabletop10">
                  <TableTop10All />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
