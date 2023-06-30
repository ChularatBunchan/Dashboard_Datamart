import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import PieVDC from "./VDCPieChart";
import AllVDCtable from "./VDCTable";
import ChartVDC from "./VDCBarChart";
import AllVDCtable2 from "./VDCTable2";
import AllVDCtable0 from "./VDCTable0";

export default function ContentVDP() {
  return (
    <div>
      <header>
        <div className="title">
          <img id="termsabuy" src="/logo-termsabuy.png" />
          <h2>Term Sabuy plus </h2>
        </div>
      </header>
      <div className="content" >
        <PieVDC />
        <ChartVDC />
        <AllVDCtable0 />
      </div>
      <div className="content" style={{marginTop: '1rem' , gap: '1.8rem'}}>
        <AllVDCtable />
        <AllVDCtable2 />
      </div>
    </div>
  );
}
