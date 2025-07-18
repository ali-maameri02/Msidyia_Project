import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { I18nextProvider } from "react-i18next";
import { CartProvider } from "./components/Landing/context/CartContext";
import i18n from "./translate/i18n";
import Home from "./components/pages/Home";
import Test from "./components/pages/Test";
import DashboardRoutes from "./components/dashboard/teacher/Dashboardroutes";
import DashboardStudentRoutes from "./components/dashboard/student/DashboardStudentRoutes";
import DashboardSellerRoutes from "./components/dashboard/ms_seller/Dashboardseller";
import Tutors from "./components/pages/Tutors_home";
import TutorDetails from "./components/pages/Tutor_detailes";
import TutorOneToOne from "./components/pages/TutorOneToOne";
import CartPage from "./components/pages/Cart";
import GroupClasses from "./components/pages/GroupClasses";
import CheckoutPage from "./components/pages/Checkout";
import GroupClassesFiltered from "./components/pages/GroupClassesFiltered";
import GroupClassDetails from "./components/pages/GroupClassDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, [location.pathname]);

  return (
    <div className="w-full bg-white text-gray-950 font-poppins">
      {/* Wrap the entire app with I18nextProvider */}
      <I18nextProvider i18n={i18n}>
        {/* Wrap the app with CartProvider */}
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/Tutors" element={<Tutors />} />
            <Route
              path="/Tutors/TutorDetails/:tutorId"
              element={<TutorDetails />}
            />
            <Route path="/group-classes" element={<GroupClasses />} />
            <Route
              path="/group-classes/category/:categoryId/"
              element={<GroupClassesFiltered />}
            />
            <Route
              path="/group-class/:classId"
              element={<GroupClassDetails />}
            />

            {/* Protected Routes - require authentication */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Tutors/TutorDetails/:tutorId/OneToOne"
              element={
                <ProtectedRoute>
                  <TutorOneToOne />
                </ProtectedRoute>
              }
            />

            {/* Role-specific Routes */}
            <Route
              path="dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["Tutor"]}>
                  <DashboardRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboardstudent/*"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <DashboardStudentRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboardseller/*"
              element={
                <ProtectedRoute allowedRoles={["Ms_seller"]}>
                  <DashboardSellerRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
