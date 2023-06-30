import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from "victory";

export default function Chart() {
  const [TimeAM, setTimeAM] = useState([]);

  useEffect(() => {
    d3.csv("/am.csv").then(setTimeAM);
  }, []);

  return (
    <>
      <VictoryChart
        width={1600}
        height={800}
        domainPadding={60}
        padding={{ top: 20, bottom: 50, left: 200, right: 0 }}
      >
        <VictoryScatter
          style={{
            data: { fill: "#564787", size: 30 }
          }}
          animate={{ duration: 1000 }}
          data={
            TimeAM.slice(0, 10)
          }
          y="service_product"
          x="count"
        />
      </VictoryChart>
    </>
  );
}
