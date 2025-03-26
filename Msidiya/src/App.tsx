import  { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";
import Home from "./components/pages/Home";
import DashboardRoutes from "./components/dashboard/teacher/Dashboardroutes";
import DashboardStudentRoutes from "./components/dashboard/student/DashboardStudentRoutes";
import DashboardSellerRoutes from "./components/dashboard/ms_seller/Dashboardseller";
import Tutors from "./components/pages/Tutors_home";
import TutorDetails from "./components/pages/Tutor_detailes";
import TutorOneToOne from "./components/pages/TutorOneToOne";

function App() {
  const location = useLocation();

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, [location.pathname]);

  return (
    <div className="w-full bg-white text-gray-950 font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/Tutors" element={<Tutors />} />
        <Route path="/Tutors/TutorDetails/:tutorId" element={<TutorDetails />} />
        <Route path="/Tutors/TutorDetails/TutorOneToOne" element={<TutorOneToOne/>} />
        
        <Route path="dashboard/*" element={<DashboardRoutes />} />
        <Route path="dashboardstudent/*" element={<DashboardStudentRoutes />} />
        <Route path="dashboardseller/*" element={<DashboardSellerRoutes />} />
        

      </Routes>
    </div>
  );
}

export default App;
