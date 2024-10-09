import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SidebarApp from "./Sidebar";
import Teacher from "./Teacher";
import UserProfile from "./UserProfile";
import Groupclasses from "./Groupclasses";
import Navbar from "./NavBar";

const DashboardRoutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <SidebarApp isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0" // Adjust the left margin based on sidebar state
        }`}
      >
        <Navbar  />
        <main className="flex-1 p-4 overflow-y-scroll w-100">
          <Routes>
            <Route path="teacher" element={<Teacher />} />
            <Route path="teacher/profile" element={<UserProfile />} />
            <Route path="teacher/group-classes" element={<Groupclasses />} />
            {/* Uncomment and add more routes as needed */}

            {/* Uncomment these as needed */}
            {/* <Route path="teacher/set-price" element={<SetPrice />} />
            <Route path="teacher/group-classes" element={<GroupClasses />} />
            <Route path="teacher/set-availability" element={<SetAvailability />} />
            <Route path="teacher/courses-manager" element={<CoursesManager />} />
            <Route path="teacher/course-transactions" element={<CourseTransactions />} />
            <Route path="teacher/upcoming-appointments" element={<UpcomingAppointments />} />
            <Route path="teacher/coupons-manager" element={<CouponsManager />} />
            <Route path="teacher/payment" element={<Payment />} />
            <Route path="teacher/payout" element={<Payout />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
