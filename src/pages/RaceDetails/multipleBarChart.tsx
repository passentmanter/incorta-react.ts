import * as React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { multipleComparisonData } from "../../types/types";

interface MultipleBarChartProps {
  multipleBarChart: multipleComparisonData;
}

const MultipleBarChart: React.FC<MultipleBarChartProps> = ({
  multipleBarChart,
}) => {
  const options: Highcharts.Options = {
    chart: {
      height: "800",
      type: "bar",
      marginTop: 100,
    },
    title: {
      text: "Comparison between all competitors according to the Points , Labs and Grid",
      align: "left",
    },
    xAxis: {
      categories: multipleBarChart.xAxis,
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: "millions",
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        pointWidth: 5,
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: 0,
      y: 0,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        name: "points",
        data: multipleBarChart.points,
        type: "bar",
      },
      {
        name: "laps",
        data: multipleBarChart.laps,
        type: "bar",
      },
      {
        name: "grid",
        data: multipleBarChart.grid,
        type: "bar",
      },
    ],
  };


  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MultipleBarChart;
