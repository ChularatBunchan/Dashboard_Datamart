import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { VictoryPie } from "victory";

export default function Chart2() {
  const [TimeAM, setTimeAM] = useState([]);

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
  }, []);
  console.log("from pie chart" ,TimeAM)

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <VictoryPie 
        colorScale={["#D0EDF9", "#C5E8F8", "#ADDFF5", "#A2DBF3", "#8AD2F1" , '#7FCDEF' , '#73C9EE' ,'#5BC0EB' , '#1DA8E3' , '#1993C8']}
        data={TimeAM.slice(0, 9)}
        y="count"
        x="service_product"
        style={{ parent: { top: 0, left: 10 }, labels: { fontSize: 10 } }}
      />
    </div>
  );
}
