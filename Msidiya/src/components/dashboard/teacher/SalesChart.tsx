import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyEarningStats } from "../../../services/dashboard/dashboard.queries";

const SalesChart: React.FC = () => {
  const { data: stats, isLoading } = useMonthlyEarningStats();

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 font-ibm-plex-mono h-[400px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 font-ibm-plex-mono h-[400px] flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-2">No Earnings Data</h3>
        <p className="text-gray-500 text-center">
          No earnings data available.
          <br />
          Start teaching classes to see your earnings here.
        </p>
      </div>
    );
  }

  const chartData = Object.entries(stats).map(([month, earnings]) => ({
    name: month,
    earnings,
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalEarnings = Object.values(stats).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 font-ibm-plex-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Monthly Earnings</h3>
        <div className="text-sm text-gray-500">{new Date().getFullYear()}</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} tickFormatter={formatCurrency} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            labelStyle={{ color: "#000" }}
            formatter={(value: number) => [formatCurrency(value), "Earnings"]}
          />
          <Bar
            dataKey="earnings"
            fill="#4F46E5"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-end text-sm text-gray-500">
        <div>Total Earnings: {formatCurrency(totalEarnings)}</div>
      </div>
    </div>
  );
};

export default SalesChart;
