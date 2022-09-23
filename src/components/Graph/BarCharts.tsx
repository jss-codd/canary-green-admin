import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartMaster() {
  const canvasEl:any = useRef(null);
  useEffect(() => {
    const ctx = canvasEl.current?.getContext("2d");
    // const ctx = document.getElementById("myChart")
    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
    ];
    const data = {
      labels: labels,
      position: "right",
      datasets: [
        {
          backgroundColor: "transparent",
          label: "Budget",
          position: "right",
          data: Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 100)
          ),
          fill: true,
          borderWidth: 6,
          borderColor: "blue",
          lineTension: 0,
          pointBackgroundColor: "",
          pointRadius: 5,
        },
        {
          backgroundColor: "transparent",
          label: "Actual",
          data: Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 100)
          ),
          fill: true,
          borderWidth: 6,
          borderColor: "orange",
          lineTension: 0,
          pointBackgroundColor: "",
          pointRadius: 3,
        },
        {
          backgroundColor: "transparent",
          label: "To Goal",
          data: Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 100)
          ),
          fill: true,
          borderWidth: 6,
          borderColor: "gray",
          lineTension: 0,
          pointBackgroundColor: "",
          pointRadius: 3,
        },
      ],
    };
    var optionsPie: any = {
      legend: {
        display: true,
        position: "right",
        labels: {
          fontColor: "rgb(255, 99, 132)",
        },
      },
    };
    const config: any = {
      type: "line",
      data: data,
      options: {
        plugins: {
          legend: {
            position: "bottom",
            boxWidth: 50,
            labels: {
              boxWidth: 25,
              boxHeight:5,
            },
          },
          title: {
            display: true,
            text: "Performance To Plan",
            font: {
              size: 25,
            },
          },
        },
      },
    };
    const myLineChart = new Chart(ctx, config);
    return function cleanup() {
      myLineChart.destroy();
    };
  });
  return (
    <div className="App">
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}

