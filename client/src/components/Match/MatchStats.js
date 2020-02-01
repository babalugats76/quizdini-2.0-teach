import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { Container } from "semantic-ui-react";
let myChart;

const MatchStats = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof myChart !== "undefined") myChart.destroy();

    myChart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        //Bring in data
        labels: [
          "01/01/2020",
          "01/02/2020",
          "01/23/2020",
          "01/26/2020",
          "01/27/2020",
          "01/28/2020",
          "01/29/2020",
          "01/30/2020",
          "01/31/2020",
          "02/01/2020"
        ],
        datasets: [
          {
            label: "Plays",
            fill: false,
            spanGaps: true,
            showLine: true,
            steppedLine: false,
            lineTension: 0.1,
            data: [
              {
                x: "01/01/2020",
                y: 50
              },
              {
                x: "01/02/2020",
                y: 5
              },
              {
                x: "01/23/2020",
                y: 45
              },
              {
                x: "01/26/2020",
                y: 10
              },
              {
                x: "01/27/2020",
                y: 10
              },
              {
                x: "01/28/2020",
                y: 18
              },
              {
                x: "01/29/2020",
                y: 0
              },
              {
                x: "01/30/2020",
                y: 9
              },
              {
                x: "01/31/2020",
                y: 1
              }
            ]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Sample Chart"
        },
        animation: {
          easing: "linear"
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              },
              distribution: "linear",
              type: "time",
              ticks: {
                stepSize: 7
              },
              time: {
                unit: "week",
                format: "MM/DD/YYYY",
                round: true,
                isoWeekday: true
              },
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              ticks: { beginAtZero: true }
            }
          ]
        }
      }
    });
  }, []);

  return (
    <Container as="main" className="page large" fluid id="match-stats">
      <canvas ref={ref => (canvasRef.current = ref)} />
    </Container>
  );
};

export default MatchStats;
