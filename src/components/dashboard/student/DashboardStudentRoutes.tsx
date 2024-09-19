import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarApp from "./SideBar";
import Student from "./Student";
import UserProfile from "./UserProfile";
import Navbar from "./NavBar";
import UpcomingAppointments from "./UpcomingAppointments";
import FavoriteTutor from "./FavoriteTutor";
import FavoriteGroupeClass from "./FavoriteGroupeClass";
import FavoriteCourse from "./FavoriteCourse";
import MyCourses from "./MyCourses";
import MyTransaction from "./MyTransaction";
import RefundRequest from "./RefundRequest";
import Notification from "./Notification";
import Messages from "./Messages";
const DashboardRoutes: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <SidebarApp />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 ml-56 px-14 lg: transition-all duration-300">
          <Routes>
            <Route path="student" element={<Student />} />
            <Route path="student/profile" element={<UserProfile />} />
            <Route path="student/Upcoming-Appointments" element={<UpcomingAppointments />} />
            <Route path="student/Favorite-tutor" element={<FavoriteTutor />} />
            <Route path="student/Favorite-Groupe-Class" element={<FavoriteGroupeClass/>}/> 
            <Route path="student/Favorite-Course" element={<FavoriteCourse/>} />
            <Route path="student/My-Courses" element={<MyCourses/>}/>
            <Route path="student/My-Transaction" element={<MyTransaction/>}  />
            <Route path="student/Refund-Request" element={<RefundRequest/>}  />
            <Route path="student/Notification" element={<Notification/>} />
            <Route path="student/Messages" element={<Messages/>} />

            {/* Uncomment these as needed */}
            {/* <Route path="student/set-price" element={<SetPrice />} />
            <Route path="student/group-classes" element={<GroupClasses />} />
            <Route path="student/set-availability" element={<SetAvailability />} />
            <Route path="student/courses-manager" element={<CoursesManager />} />
            <Route path="student/course-transactions" element={<CourseTransactions />} />
            <Route path="student/upcoming-appointments" element={<UpcomingAppointments />} />
            <Route path="student/coupons-manager" element={<CouponsManager />} />
            <Route path="student/payment" element={<Payment />} />
            <Route path="student/payout" element={<Payout />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
