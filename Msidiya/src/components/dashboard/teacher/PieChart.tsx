import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGroupClassCompletionStats } from "../../../services/dashboard/dashboard.queries";
import { FaChartPie } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const { data: stats, isLoading } = useGroupClassCompletionStats();

  const isEmptyData =
    stats && stats.completed === 0 && stats.not_completed === 0;

  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "Group Class Completion",
        data: stats ? [stats.completed, stats.not_completed] : [0, 0],
        backgroundColor: [
          "#4A90E2", // Bright Blue
          "#F5A623", // Bright Orange
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    aspectRatio: 1,
    cutout: "50%",
    animation: {
      animateRotate: true,
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isEmptyData) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FaChartPie className="text-gray-400 text-4xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Data Available
        </h3>
        <p className="text-gray-500 text-center">
          There are no group classes completed or in progress yet.
          <br />
          Start creating group classes to see statistics here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-72 flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
