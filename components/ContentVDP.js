import React, { useState, useEffect } from "react";
import PieVDP from "./VDPPieChart";
import BarChartVDP from "./VDPBarChart";
import AllVDPtable from "./VDPTable";
import AllVDPtable2 from "./VDPTable2";

export default function ContentVDP() {
  return (
    <div>
      <header>
        <div className="title">
          <img id="termsabuy" src="/logo-VDP.png" />
          <h2 id="SVP">Sabuy Vending Plus</h2>
        </div>
      </header>
      <div className="content" >
        <PieVDP />
        <BarChartVDP />
      </div>
      <div className="content" style={{marginTop: '1rem' , gap: '1.8rem'}}>
        <AllVDPtable />
        <AllVDPtable2 />
      </div>
    </div>
  );
}