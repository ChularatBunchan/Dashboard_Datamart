import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsFilterLeft } from "react-icons/bs";
import * as d3 from "d3";

export default function AllVDCtable() {
  const [Top10, setTop10] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    d3.csv("/table_VDP.csv").then((data) => {
      const sortedData = data.sort((a, b) => a.amount - b.amount);
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

  const dataService = Top10.map((element) => element.service);
  const dataSubservice = Top10.map((element) => element.sub_service);
  const dataCount = Top10.map((element) => element.count);
  const dataAmount = Top10.map((element) => element.sum);
  const dataAverage = dataAmount.map((amount, index) => amount / dataCount[index]);

  const rows = dataService.map((name, index) => ({
    name,
    dataSubservice: dataSubservice[index],
    dataCount: dataCount[index],
    dataAmount: dataAmount[index],
    dataAverage: dataAverage[index].toFixed(2),
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(8, 128, 124,0.4)" }}>
              <TableCell
                onClick={() => handleSort("Subservice")}
                sx={{ cursor: "pointer" }}
              >
                Service
              </TableCell>
              <TableCell
                onClick={() => handleSort("Amount")}
                sx={{ cursor: "pointer" }}
              >
                <BsFilterLeft size={18} />
                Amount
                {sortColumn === "Amount" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleSort("Count")}
              >
                <BsFilterLeft size={18} />
                Transaction
                {sortColumn === "Count" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleSort("Average")}
              >
                <BsFilterLeft size={18} />
                Average
                {sortColumn === "Average" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(0, 10).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dataSubservice}
                </TableCell>
                <TableCell>{row.dataAmount}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.dataCount}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.dataAverage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
