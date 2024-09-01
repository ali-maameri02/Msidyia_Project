import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, Logo } from "react-mui-sidebar";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookIcon from "@mui/icons-material/Book";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EventIcon from "@mui/icons-material/Event";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import '../../../index.css'
const SidebarApp: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Toggle button for smaller screens */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1200,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for smaller screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Sidebar
          width="16rem"
          className="custom-scrollbar"
          style={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
            Msidiya
          </Logo>
          <Menu>
            <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher">
              Dashboard
            </MenuItem>
            <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile">
              Profile
            </MenuItem>
            <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price">
              Set price
            </MenuItem>
            <MenuItem icon={<GroupIcon />} link="/dashboard/teacher/group-classes">
              My Group Classes
            </MenuItem>
            <MenuItem icon={<CalendarTodayIcon />} link="/dashboard/teacher/set-availability">
              Set Availability
            </MenuItem>
            <MenuItem icon={<BookIcon />} link="/dashboard/teacher/courses-manager">
              Courses Manager
            </MenuItem>
            <MenuItem icon={<ReceiptIcon />} link="/dashboard/teacher/course-transactions">
              Course Transactions
            </MenuItem>
            <MenuItem icon={<EventIcon />} link="/dashboard/teacher/upcoming-appointments">
              Upcoming Appointments
            </MenuItem>
            <MenuItem icon={<LocalOfferIcon />} link="/dashboard/teacher/coupons-manager">
              Coupons manager
            </MenuItem>
            <MenuItem icon={<PaymentIcon />} link="/dashboard/teacher/payment">
              Payment
            </MenuItem>
            <MenuItem icon={<MonetizationOnIcon />} link="/dashboard/teacher/payout">
              Payout
            </MenuItem>
          </Menu>
        </Sidebar>
      </Drawer>

      {/* Sidebar for larger screens */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          height: '100vh', 
          zIndex: 1000,
          overflowY: "auto" 
        }}
      >
        <Sidebar
          width="16rem"
          className="custom-scrollbar"
          style={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            display: { xs: "none", md: "block" }, // Hidden on smaller screens
          }}
        >
          <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
            Msidiya
          </Logo>
          <Menu>
            <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher">
              Dashboard
            </MenuItem>
            <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile">
              Profile
            </MenuItem>
            <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price">
              Set price
            </MenuItem>
            <MenuItem icon={<GroupIcon />} link="/dashboard/teacher/group-classes">
              My Group Classes
            </MenuItem>
            <MenuItem icon={<CalendarTodayIcon />} link="/dashboard/teacher/set-availability">
              Set Availability
            </MenuItem>
            <MenuItem icon={<BookIcon />} link="/dashboard/teacher/courses-manager">
              Courses Manager
            </MenuItem>
            <MenuItem icon={<ReceiptIcon />} link="/dashboard/teacher/course-transactions">
              Course Transactions
            </MenuItem>
            <MenuItem icon={<EventIcon />} link="/dashboard/teacher/upcoming-appointments">
              Upcoming Appointments
            </MenuItem>
            <MenuItem icon={<LocalOfferIcon />} link="/dashboard/teacher/coupons-manager">
              Coupons manager
            </MenuItem>
            <MenuItem icon={<PaymentIcon />} link="/dashboard/teacher/payment">
              Payment
            </MenuItem>
            <MenuItem icon={<MonetizationOnIcon />} link="/dashboard/teacher/payout">
              Payout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;
