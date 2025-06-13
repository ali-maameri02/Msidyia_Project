import React, { useEffect } from "react";
// import TrafficSource from './TrafficSource';
import PieChart from "./PieChart";
import SalesChart from "./SalesChart";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaTasks,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { fetchUserData } from "../../../utils/userData";
import { useNotifications } from "../../../services/notifications/notification.queries";
import { useLatestMessagesQuery } from "../../../services/chat/chat.queries";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../../hooks/useAuth";
import { useDashboardStats } from "../../../services/dashboard/dashboard.queries";

const Teacher: React.FC = () => {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const { data: notifications = [], isLoading: notificationsLoading } =
    useNotifications();
  const { data: latestMessages } = useLatestMessagesQuery(user || undefined);

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "payment":
        return <PaymentIcon />;
      case "account":
        return <AccountBalanceIcon />;
      case "mall":
        return <LocalMallIcon />;
      case "cart":
        return <ShoppingCartIcon />;
      default:
        return <PaymentIcon />;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      await fetchUserData();
    };
    getUserData();
  }, []);

  return (
    <div className="pl-12 ml-5 w-100">
      {/* Main Content */}
      <main className="flex flex-col justify-center  mt-20 bg-transparent   ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Courses Card */}
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChalkboardTeacher className="text-purple-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalCourses.count}
              </p>
              <p
                className={`text-sm ${
                  stats?.totalCourses.growth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stats?.totalCourses.growth >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(stats?.totalCourses.growth || 0)}% Since last month
              </p>
            </div>
          </div>

          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaBookOpen className="text-green-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalStudents.count}
              </p>
              <p
                className={`text-sm ${
                  stats?.totalStudents.growth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stats?.totalStudents.growth >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(stats?.totalStudents.growth || 0)}% Since last month
              </p>
            </div>
          </div>

          {/* Group Classes Card */}
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaTasks className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Group Classes</p>
              <p className="text-2xl font-bold">
                {statsLoading ? "..." : `${stats?.groupClasses.percentage}%`}
              </p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: `${stats?.groupClasses.percentage || 0}%` }}
                ></div>
              </div>
              <p
                className={`text-sm ${
                  stats?.groupClasses.growth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stats?.groupClasses.growth >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(stats?.groupClasses.growth || 0)}% Since last month
              </p>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold">
                {statsLoading
                  ? "..."
                  : `$${stats?.totalEarnings.amount.toLocaleString()}`}
              </p>
              <p
                className={`text-sm ${
                  stats?.totalEarnings.growth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stats?.totalEarnings.growth >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(stats?.totalEarnings.growth || 0)}% Since last month
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl col-span-2">
            <h2 className="text-xl font-bold">Monthly Sales</h2>
            <div className="rounded-lg" style={{ zIndex: "-9999" }}>
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
            {notificationsLoading ? (
              <p className="text-gray-500">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-gray-500">No notifications found</p>
            ) : (
              <ul>
                {notifications.slice(0, 4).map((notification) => (
                  <li
                    key={notification.id}
                    className="py-2 border-b flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getNotificationIcon(notification.user)}
                    </div>
                    <div>
                      <p className="font-medium">{notification.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            {!latestMessages ? (
              <p className="text-gray-500">Loading messages...</p>
            ) : latestMessages.length === 0 ? (
              <p className="text-gray-500">No messages found</p>
            ) : (
              <ul>
                {latestMessages.slice(0, 4).map((msg, index) => (
                  <li
                    key={index}
                    className="py-2 border-b flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaTasks className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">{msg.last_message}</p>
                      <p className="text-sm text-gray-500">
                        From {msg.user.username}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teacher;
