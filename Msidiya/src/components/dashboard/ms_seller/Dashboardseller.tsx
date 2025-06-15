import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Seller from "./Seller";
import SidebarApp from "./Sidebar";
import UserProfile from "./UserProfile";
import MyTransaction from "./MyTransaction";
import Payout from "./Payout";
import Messages from "./Messages";
import Notification from "./Notification";
import { useMediaQuery, useTheme } from "@mui/material";

const DashboardRoutes: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <SidebarApp isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar />
        <main className="flex-1 p-4 overflow-y-scroll w-100">
          <Routes>
            <Route path="seller" element={<Seller />} />
            <Route path="seller/profile" element={<UserProfile />} />
            <Route path="seller/MyTransaction" element={<MyTransaction />} />
            <Route path="seller/payment" element={<Payout />} />
            <Route path="seller/messages" element={<Messages />} />
            <Route path="seller/notifications" element={<Notification />} />

            {/* Uncomment and add other routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
