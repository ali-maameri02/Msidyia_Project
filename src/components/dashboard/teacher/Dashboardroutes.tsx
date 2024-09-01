import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarApp from "./Sidebar";
import Teacher from "./Teacher";
import UserProfile from "./UserProfile";
import Navbar from "./NavBar";

const DashboardRoutes: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <SidebarApp />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 ml-56 px-14 lg: transition-all duration-300">
          <Routes>
            <Route path="teacher" element={<Teacher />} />
            <Route path="teacher/profile" element={<UserProfile />} />
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
