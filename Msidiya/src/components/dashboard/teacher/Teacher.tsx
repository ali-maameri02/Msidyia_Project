import React from 'react';
// import TrafficSource from './TrafficSource';
import PieChart from './PieChart';
import SalesChart from './SalesChart';
import { FaChalkboardTeacher, FaBookOpen, FaTasks, FaMoneyCheckAlt } from 'react-icons/fa';

const Teacher: React.FC = () => {
  return (
    <div className="pl-12 ml-5 w-100">
    

      {/* Main Content */}
      <main className="flex flex-col justify-center  mt-20 bg-transparent   ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChalkboardTeacher className="text-purple-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-green-500">↑ 8% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaBookOpen className="text-green-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-red-500">↓ 2% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaTasks className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Group Classes</p>
              <p className="text-2xl font-bold">75.5%</p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '75.5%' }}></div>
              </div>
              <p className="text-sm text-green-500">↑ 5% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold">$15k</p>
              <p className="text-sm text-green-500">↑ 12% Since last month</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl col-span-2">
            <h2 className="text-xl font-bold">Monthly Sales</h2>
            <div className="rounded-lg" style={{ zIndex: '-9999' }}>
              <SalesChart />
            </div>
          </div>

          {/* Traffic Source */}
          <div className="bg-white p-4 h-full w-full rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Course Enrollments</h2>
            <div className=" z-10 rounded-lg">
              <PieChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 bg-transparent">
          {/* Latest Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Latest Notifications</h2>
            <ul>
              <li className="py-2 border-b">Assignment deadline for Math 101</li>
              <li className="py-2 border-b">New message from John Doe</li>
              <li className="py-2 border-b">Class canceled for Biology 202</li>
              <li className="py-2">New enrollment in Chemistry 303</li>
            </ul>
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            <ul>
              <li className="py-2 border-b">MSG-001 - From Jane Smith</li>
              <li className="py-2 border-b">MSG-002 - From Mark Wilson</li>
              <li className="py-2 border-b">MSG-003 - From Sarah Brown</li>
              <li className="py-2">MSG-004 - From Alex Johnson</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teacher;
