import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import ChartVDP from "./VDPBarChart";
import VDPTable from "./VDPTable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import PieVDP from "./VDPPieChart";

export default function ContentVDP() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("alltime");
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedDayOrNight, setSelectedDayOrNight] = useState("Alltime");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [activeButton, setActiveButton] = useState("");
  const [filteredData, setFilteredData] = useState([]);  
  const [showTable, setShowTable] = useState(true); // State for showing table
  const [showPie, setShowPie] = useState(false); // State for showing pie chart

  useEffect(() => {
    d3.csv("/VDP.csv").then((data) => {
      setData(data);
      setFilteredData(data);
    });
  }, []);

  const handleOptionChange = (event, category) => {
    const selectedValue = event.target.value;
    switch (category) {
      case "month":
        setSelectedMonth(selectedValue);
        break;
      case "day":
        setSelectedDay(selectedValue);
        break;
      case "dayOrNight":
        setSelectedDayOrNight(selectedValue);
        break;
      case "location":
        setSelectedLocation(selectedValue);
        break;
      default:
        break;
    }
  };

  const handleCalculate = () => {
    let newData = [...data];

    if (selectedMonth !== "alltime") {
      newData = newData.filter((item) => item.month === selectedMonth);
    }

    if (selectedDay !== "All") {
      newData = newData.filter((item) => item.dofweek === selectedDay);
    }

    if (selectedDayOrNight !== "Alltime") {
      newData = newData.filter((item) => item.hour === selectedDayOrNight);
    }

    if (selectedLocation !== "All") {
      newData = newData.filter((item) => item.region === selectedLocation);
    }

    setFilteredData(newData);
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
          <img id="termsabuy" src="/logo-VDP.png" />
          <h2 id="SVP">Sabuy Vending Plus</h2>
        </div>
      </header>
      <div className="content">
        {/* <div className="conwrapper">
          <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}>
            <InputLabel id="time-period-label">Month</InputLabel>
            <Select
              labelId="time-period-label"
              value={selectedMonth}
              onChange={(event) => handleOptionChange(event, "month")}
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

          <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}>
            <InputLabel id="day-label">Day</InputLabel>
            <Select
              labelId="day-label"
              value={selectedDay}
              onChange={(event) => handleOptionChange(event, "day")}
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

          <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}>
            <InputLabel id="day-night-label">Day or Night</InputLabel>
            <Select
              labelId="day-night-label"
              value={selectedDayOrNight}
              onChange={(event) => handleOptionChange(event, "dayOrNight")}
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

          <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "aliceblue" }}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              value={selectedLocation}
              onChange={(event) => handleOptionChange(event, "location")}
              autoWidth
              label="Location"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="North">North</MenuItem>
              <MenuItem value="South">South</MenuItem>
              <MenuItem value="East">East</MenuItem>
              <MenuItem value="West">West</MenuItem>
            </Select>
          </FormControl>

          <Button className="button" onClick={handleCalculate}>
            Filter
          </Button>
        </div> */}

        {/* CHART day*/}
        <span id="SPAN"> </span>
        <div className="charts">
          <div className="chart1">
            <div className="bar">
              <h2>Product Transaction</h2>
              <div className="Mchart">
                <ChartVDP data={filteredData} />
              </div>
            </div>
          </div>
          <div className="chart2" style={{ width: "800px" }}>
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
                      <PieVDP  style={{ width: "60rem" ,height: "60rem" }} />
                    </div>
                </center>
              )}
              {showTable && (
                <div className="tabletop10">
                  <VDPTable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}