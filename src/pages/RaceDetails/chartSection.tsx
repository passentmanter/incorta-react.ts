import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ComparisonData } from "../../types/types";

interface ChartSectionProps {
  comparisonDrivers: ComparisonData;
}

const ChartSection: React.FC<ChartSectionProps> = ({ comparisonDrivers }) => {
  /**
   * Configuration options for the Highcharts column chart, customized to display
   * driver comparison data for the selected metric.
   */
  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: comparisonDrivers.title,
      align: "left",
    },
    xAxis: {
      categories: comparisonDrivers.xAxis,
      crosshair: true,
      accessibility: {
        description: "Drivers",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Metric",
      },
    },
    tooltip: {
      valueSuffix: " units",
    },
    plotOptions: {
      column: {
        pointWidth: 20,
        pointPadding: 0.5,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Comparison Metric",
        data: comparisonDrivers.yAxis,
        type: "column",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartSection;
