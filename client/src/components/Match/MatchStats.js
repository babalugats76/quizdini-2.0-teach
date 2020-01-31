import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

let myChart;

const MatchStats = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof myChart !== "undefined") myChart.destroy();

    myChart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        //Bring in data
        labels: ["1", "2", "3"],
        datasets: [
          {
            label: "My data",
            data: [10, 20, 30],
            backgroundColor: "#112233"
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }, []);

  return <canvas ref={ref => (canvasRef.current = ref)} />;
};

export default MatchStats;
