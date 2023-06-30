import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";

export default function AllVDCtable() {
  const [Top10, setTop10] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    d3.csv("/VDC.csv").then((data) => {
      const sortedData = data
        .sort((a, b) => a.amount - b.amount);
      setTop10(sortedData);
    });
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
    }
    setSortColumn(column);
  };

  const dataNo = Top10.map((element) => element.No);
  const dataDevice = Top10.map((element) => element.device);
  const dataRegion = Top10.map((element) => element.region);
  const dataLat = Top10.map((element) => element.lat);
  const dataLng= Top10.map((element) => element.lng);
  const dataService = Top10.map((element) => element.service);
  const dataSubservice = Top10.map((element) => element.sub_service);
  const dataCount = Top10.map((element) => element.count_amount);
  const dataAmount = Top10.map((element) => element.sum_amount);

  const rows = dataNo.map((name, index) => ({
    name,
    dataDevice: dataDevice[index],
    dataLat: dataLat[index],
    dataLng: dataLng[index],
    dataRegion: dataRegion[index],
    dataSubservice: dataSubservice[index],
    dataService: dataService[index],
    dataCount: dataCount[index],
    dataAmount: dataAmount[index],
  }));

  let sortedRows = [...rows];
  if (sortColumn !== null) {
    sortedRows = sortedRows.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[`data${sortColumn}`] - b[`data${sortColumn}`];
      } else {
        return b[`data${sortColumn}`] - a[`data${sortColumn}`];
      }
    });
  }

  return (
    <div>
      <h3>Device best seller</h3>
      <TableContainer component={Paper} sx={{
          maxHeight: 400,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "8px", 
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
          },
        }}
        >
        <Table sx={{  "& td": { fontSize: "14px" } }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(44, 119, 188,0.4)"}}>
              <TableCell onClick={() => handleSort("Device")}>
                Device
              </TableCell>
              <TableCell onClick={() => handleSort("Service")}>
                Service
              </TableCell>
              <TableCell onClick={() => handleSort("Subservice")}>
                Sub Service
              </TableCell>
              <TableCell width={200}>
                Region *
              </TableCell>
              <TableCell onClick={() => handleSort("Service")}>
                lat
              </TableCell> <TableCell onClick={() => handleSort("Service")}>
                lng
              </TableCell>
              <TableCell onClick={() => handleSort("Amount")} width={100}>
                Amount
                {sortColumn === "Amount" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }} onClick={() => handleSort("Count")}>
                Transaction
                {sortColumn === "Count" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(0,100).map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dataDevice}
                </TableCell>
                <TableCell>{row.dataService}</TableCell>
                <TableCell>{row.dataSubservice}</TableCell>
                <TableCell>{row.dataRegion}</TableCell>
                <TableCell>{row.dataLat}</TableCell>
                <TableCell>{row.dataLng}</TableCell>
                <TableCell>{row.dataAmount}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.dataCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{fontSize: '15px' , marginTop: '10px' , color: 'red'}}>Region : offline = lat , long (0,0) </p>
    </div>
  );
}
