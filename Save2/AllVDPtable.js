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
    d3.csv("/table_VDP.csv").then((data) => {
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

  const dataEntity = Top10.map((element) => element.entity);
  const dataSubservice = Top10.map((element) => element.sub_service);
  const dataCount = Top10.map((element) => element.count);
  const dataAmount = Top10.map((element) => element.sum);

  const rows = dataEntity.map((name, index) => ({
    name,
    dataSubservice: dataSubservice[index],
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(151, 207, 144)" }}>
              <TableCell onClick={() => handleSort("Subservice")}>
                Service
              </TableCell>
              <TableCell onClick={() => handleSort("Amount")}>
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
            {sortedRows.slice(0,10).map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dataSubservice}
                </TableCell>
                <TableCell>{row.dataAmount}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.dataCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
