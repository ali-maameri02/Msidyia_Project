import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', lastYear: 3000, thisYear: 4000 },
  { name: 'Feb', lastYear: 2500, thisYear: 3000 },
  { name: 'Mar', lastYear: 1500, thisYear: 2000 },
  { name: 'Apr', lastYear: 2000, thisYear: 2780 },
  { name: 'May', lastYear: 1800, thisYear: 1890 },
  { name: 'Jun', lastYear: 2200, thisYear: 2390 },
  { name: 'Jul', lastYear: 3200, thisYear: 3490 },
  { name: 'Aug', lastYear: 2700, thisYear: 3000 },
  { name: 'Sep', lastYear: 2300, thisYear: 2500 },
  { name: 'Oct', lastYear: 2900, thisYear: 3300 },
  { name: 'Nov', lastYear: 3100, thisYear: 3600 },
  { name: 'Dec', lastYear: 3500, thisYear: 3800 },
];

const SalesChart: React.FC = () => {
  return (
    <div style={{zIndex:'-9999'}} className="bg-white shadow-md rounded-lg p-6 font-ibm-plex-mono">
      <h3 className="text-lg font-semibold mb-4">Sales Chart</h3>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
            labelStyle={{ color: '#000' }}
          />
          <Bar dataKey="lastYear" fill="#4F46E5" barSize={30} opacity={0.5} />
          <Bar dataKey="thisYear" fill="#4F46E5" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
