import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllVDCtable from "./AllVDCtable";
import AllVDPtable from "./AllVDPtable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Alltable() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, []);

  const handleChange = (event, newValue) => {
    console.log("value", newValue);
    setValue(newValue);
    console.log("value", newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "97%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="VDC" {...a11yProps(0)} />
            <Tab label="VDP" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {value === 0 && (
          <div className="TableBuB">
            <AllVDCtable />
          </div>
        )}
        {value === 1 && (
          <div className="TableBuB">
            <AllVDPtable />
          </div>
        )}
      </Box>
    </div>
  );
}
