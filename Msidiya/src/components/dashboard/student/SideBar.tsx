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
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ClassNames } from "@emotion/react";
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
          top:16,
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
            <MenuItem icon={<DashboardIcon />}  link="/dashboardstudent/student">
              Dashboard
            </MenuItem>
            <MenuItem icon={<PersonIcon />}  className="" link="/dashboardstudent/student/profile">
              Profile
            </MenuItem>
            <MenuItem icon={<DateRangeIcon />} link="/dashboardstudent/student/Upcoming-Appointments">
              Upcoming Appointment
            </MenuItem>
            <MenuItem icon={<GroupIcon />} className="side-bar-checked" link="/dashboardstudent/student/Favorite-tutor">
              Favorite tutor
            </MenuItem>
            <MenuItem icon={<CalendarTodayIcon />} link="/dashboardstudent/student/Favorite-Groupe-Class">
              Favorite Groupe Class
            </MenuItem>
            <MenuItem icon={<BookIcon />} link="/dashboardstudent/student/Favorite-Course">
             Favorite Course
            </MenuItem>
            <MenuItem icon={<ReceiptIcon />} link="/dashboardstudent/student/My-Courses">
               My Courses
            </MenuItem>
            <MenuItem icon={<CreditCardIcon />} className="active:bg-blue-400" link="/dashboardstudent/student/My-Transaction">
              My Transaction
            </MenuItem>
            <MenuItem icon={<PaidIcon />} link="/dashboardstudent/student/Refund-Request">
               Refund Request
            </MenuItem>
            <MenuItem icon={<NotificationsActiveIcon />} link="/dashboardstudent/student/Notification">
              Notification
            </MenuItem>
            <MenuItem icon={<TelegramIcon />} link="/dashboardstudent/student/Messages">
              Messages
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
            <MenuItem icon={<DashboardIcon />} link="/dashboardstudent/student">
              Dashboard
            </MenuItem>
            <MenuItem icon={<PersonIcon />} link="/dashboardstudent/student/profile">
              Profile
            </MenuItem>
            <MenuItem icon={<DateRangeIcon />} link="/dashboardstudent/student/Upcoming-Appointments">
              Upcoming Appointments
            </MenuItem>
            <MenuItem icon={<GroupIcon />} link="/dashboardstudent/student/Favorite-tutor">
              Favorite tutor
            </MenuItem>
            <MenuItem icon={<CalendarTodayIcon />} link="/dashboardstudent/student/Favorite-Groupe-Class">
              Favorite Groupe Class
            </MenuItem>
            <MenuItem icon={<BookIcon />} link="/dashboardstudent/student/Favorite-Course">
              Favorite Course
            </MenuItem>
            <MenuItem icon={<ReceiptIcon />} link="/dashboardstudent/student/My-Courses">
              My Courses
            </MenuItem>
            <MenuItem icon={<CreditCardIcon /> }  link="/dashboardstudent/student/My-Transaction">
             My Transaction
            </MenuItem>
            <MenuItem icon={<PaidIcon /> } link="/dashboardstudent/student/Refund-Request">
              Refund Request
            </MenuItem>
            <MenuItem icon={<NotificationsActiveIcon />} link="/dashboardstudent/student/Notification">
              Notification
            </MenuItem>
            <MenuItem icon={<TelegramIcon />} link="/dashboardstudent/student/Messages">
              Messages
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;
