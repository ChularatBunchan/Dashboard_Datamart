import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";

export default function AllVDPtable2() {
  const [top10, setTop10] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    d3.csv("/VDP.csv").then((data) => {
      const groupedData = d3.group(data, (d) => d.month);
      const aggregatedData = Array.from(groupedData, ([month, items]) => ({
        month,
        count: d3.sum(items, (d) => Number(d.count_amount)),
        amount: d3.sum(items, (d) => Number(d.sum_amount)),
      }));
      const sortedData = aggregatedData.sort((a, b) =>
        sortDirection === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn]
      );
      setTop10(sortedData);
    });
  }, [sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
    }
    setSortColumn(column);
  };

  return (
    <div>
      <h3>Month's Best Sellers</h3>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "200", "& td": { fontSize: "14px" } }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(8, 128, 124,0.4)" }}>
              <TableCell onClick={() => handleSort("month")}>
                Month
                {sortColumn === "month" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
              <TableCell onClick={() => handleSort("amount")}>
                Amount
                {sortColumn === "amount" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ textAlign: "center" }}
                onClick={() => handleSort("count")}
              >
                Transaction
                {sortColumn === "count" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.month}
                </TableCell>
                <TableCell>{(row.amount).toFixed(2)}</TableCell>
                <TableCell>{(row.count).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
