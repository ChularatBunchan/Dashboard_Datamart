import React, { useState, useEffect } from "react";
import Chart2 from "./Chart2";
import * as d3 from "d3";
import Chart from "./ChartAm";

export default function ContentProduct() {
  return (
    <>
      <header>
        <div className="title">
          <h1>Product Overview </h1>
        </div>
      </header>
      <div className="content">
        <div className="conwrapper">
          <div className="tabs">
            <div className="categories">
              <h1>No. Product : </h1>
              <form>
                <input type="text" value="475" disabled="disabled"></input>
              </form>
            </div>
          </div>
          <div className="tabs">
            <div className="categories">
              <h1>Best seller : </h1>
              <form>
                <input
                  type="text"
                  value="Something"
                  disabled="disabled"
                ></input>
              </form>
            </div>
          </div>
        </div>
        {/* CHART */}
        <div className="charts">
          <div className="chart1">
            <div className="bar">
              <h2>Best saller A.M</h2>
              <div className="BarChart">
                <Chart />
              </div>
            </div>
          </div>
          <div className="chart2">
            <div className="bar">
              <div className="PieChart">
                <h2>Top 10 best seller</h2>
                <Chart2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
