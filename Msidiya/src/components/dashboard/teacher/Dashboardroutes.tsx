import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SidebarApp from "./Sidebar";
import Navbar from "./NavBar";
import Groupclasses from "./Groupclasses";
import Updategroupclasse from "./Updategroupclasse";
import UserProfile from "./UserProfile";
import Setcategories from "./Setcategories";
import AddGroupClass from "./AddGroupClass";
import Teacher from "./Teacher";
import Transactions from "./Transactions";
import UpcomingAppointments from "./UpcomingAppointments";
import PayoutComponent from "./Payout";
import GroupClassesTransaction from "./GroupClassesTransaction";
import Messages from "./Messages";
import Notification from "./Notification";
import GroupClassReviews from "./GroupClassReviews";
const DashboardRoutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Move mock data here
  const mockTransactions = [
    { userName: "Minh Student", courseName: "test course", price: "$30", earnings: "$27", createdOn: "Feb 28, 2024" },
    { userName: "studentharry", courseName: "Reading 101", price: "$100", earnings: "$90", createdOn: "Jan 9, 2024" },
    { userName: "Priya", courseName: "The Ultimate Guide To Understanding Algebra", price: "$40", earnings: "$36", createdOn: "Aug 30, 2023" },
    { userName: "Priya", courseName: "Reading 101", price: "$100", earnings: "$90", createdOn: "Aug 25, 2023" },
    { userName: "Priya", courseName: "New Course Test", price: "$21", earnings: "$18.9", createdOn: "Mar 1, 2023" },
  ];

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
            <Route path="teacher" element={<Teacher />} />
            <Route path="teacher/group-classes" element={<Groupclasses />} />
            <Route path="teacher/group-classes/reviews" element={<GroupClassReviews />} />
            <Route path="teacher/group-classes/add" element={<AddGroupClass />} />
            <Route path="teacher/group-classes/update/:id" element={<Updategroupclasse />} />
            <Route path="teacher/set-categories" element={<Setcategories />} />
            <Route path="teacher/profile" element={<UserProfile />} />
            <Route path="teacher/payout" element={<PayoutComponent />} /> {/* teacher payoutA*/}
            <Route path="teacher/messages" element={<Messages />} /> 
            <Route path="teacher/notifications" element={<Notification />} />
            {/* Pass transactions as a prop here */}
            <Route path="teacher/course-transactions" element={<Transactions transactions={mockTransactions} />} />
            <Route path="teacher/upcoming-appointments" element={<UpcomingAppointments />} />
            <Route path="teacher/group-class-transactions" element={<GroupClassesTransaction />} /> {/*  group class trans*/}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
