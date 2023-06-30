import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as d3 from "d3";

export default function AllVDCtable0() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/VDC.csv").then((data) => {
      setData(data);
    });
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortDirection("asc");
    }
    setSortColumn(column);
  };

  const countBySubService = {};

  data.forEach((element) => {
    const subService = element.sub_service;
    const sumAmount = Number(element.sum_amount);

    if (countBySubService[subService]) {
      countBySubService[subService] += sumAmount;
    } else {
      countBySubService[subService] = sumAmount;
    }
  });

  const sortedData = Object.entries(countBySubService).sort((a, b) => {
    if (sortColumn === "sub_service") {
      return sortDirection === "asc"
        ? a[0].localeCompare(b[0])
        : b[0].localeCompare(a[0]);
    } else if (sortColumn === "sum_amount") {
      return sortDirection === "asc" ? a[1] - b[1] : b[1] - a[1];
    } else {
      return 0;
    }
  });

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
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
        <Table
          sx={{  "& td": { fontSize: "14px" } }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(44, 119, 188,0.4)" }}>
              <TableCell onClick={() => handleSort("sub_service")}>
                Sub Service
              </TableCell>
              <TableCell onClick={() => handleSort("sum_amount")}>
                Amount
                {sortColumn === "sum_amount" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map(([subService, sumAmount]) => (
              <TableRow key={subService}>
                <TableCell>{subService}</TableCell>
                <TableCell>{sumAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
