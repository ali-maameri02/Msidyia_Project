import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: string;
  change?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg ">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && <p className="text-sm text-green-500">{change}</p>}
    </div>
  );
};

export default StatisticsCard;
