import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 3],
        backgroundColor: [
          '#4A90E2', // Bright Blue
          '#635BFF', // Teal
          '#F5A623', // Bright Orange
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    aspectRatio: 1,
    cutout: '50%',
    animation: {
      animateRotate: true,
    },
  };

  return (
    <div className="w-full h-72 flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
