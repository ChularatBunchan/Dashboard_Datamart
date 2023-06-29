import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { VictoryPie } from "victory";

export default function Chart2() {
  const [TimeAM, setTimeAM] = useState([]);

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <VictoryPie
        // colorScale={["#1DA8E3", "#47B8E8", "#5BC0EB", "#73C9EE", "#7FCDEF" , '#8AD2F1' , '#A2DBF3' ,'#ADDFF5' , '#C5E8F8' , '#D0EDF9']}
        colorScale={["#D0EDF9", "#C5E8F8", "#ADDFF5", "#A2DBF3", "#8AD2F1" , '#7FCDEF' , '#73C9EE' ,'#5BC0EB' , '#1DA8E3' , '#1993C8']}
        data={TimeAM.slice(0, 10)}
        x="service_product"
        y="count"
        style={{ parent: { top: 0, left: 10 }, labels: { fontSize: 10 } }}
      />
    </div>
  );
}
