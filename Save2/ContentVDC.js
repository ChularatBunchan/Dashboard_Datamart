import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import ChartVDP from "./VDPBarChart";
import VDPTable from "./VDPTable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import PieVDC from "./VDCPieChart";
import AllVDCtable from "./VDCTable";

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
    d3.csv("/VDC.csv").then((data) => {
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
        <img id="termsabuy" src="/logo-termsabuy.png" />  

          <h2>Term Sabuy plus </h2>
        </div>
      </header>
      <div className="content">

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
                <center style={{ width: "600px" }}>
                    <div className="Pietop10">
                      <PieVDC  style={{ width: "60rem" ,height: "60rem" }} />
                    </div>
                </center>
              )}
              {showTable && (
                <div className="tabletop10">
                  <AllVDCtable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}