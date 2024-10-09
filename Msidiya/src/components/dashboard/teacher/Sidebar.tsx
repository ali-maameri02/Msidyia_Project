import React from "react";
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

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Toggle button for smaller screens */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        sx={{
          display: { xs: "block", md: "block" },
          position: "fixed",
          top: 6,
          left: 16,
          zIndex: 99999,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for smaller screens */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        BackdropProps={{ invisible: true }}
        sx={{
          display: { xs: "block", md: "none" },
          ".MuiDrawer-paper": {
            boxShadow: "none",
            width: 240,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f0f0f0',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          },
        }}
      >
        <Sidebar
          width="16rem"
          sx={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f0f0f0',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
            Msidiya
          </Logo>
          <Menu>
            {isSidebarOpen ? (
              <>
                <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher">
                  Dashboard
                </MenuItem>
                <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile">
                  Profile
                </MenuItem>
                <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price">
                  Set categories
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
              </>
            ) : (
              <>
                <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher" />
                <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile" />
                <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price" />
                <MenuItem icon={<GroupIcon />} link="/dashboard/teacher/group-classes" />
                <MenuItem icon={<CalendarTodayIcon />} link="/dashboard/teacher/set-availability" />
                <MenuItem icon={<BookIcon />} link="/dashboard/teacher/courses-manager" />
                <MenuItem icon={<ReceiptIcon />} link="/dashboard/teacher/course-transactions" />
                <MenuItem icon={<EventIcon />} link="/dashboard/teacher/upcoming-appointments" />
                <MenuItem icon={<LocalOfferIcon />} link="/dashboard/teacher/coupons-manager" />
                <MenuItem icon={<PaymentIcon />} link="/dashboard/teacher/payment" />
                <MenuItem icon={<MonetizationOnIcon />} link="/dashboard/teacher/payout" />
              </>
            )}
          </Menu>
        </Sidebar>
      </Drawer>

      {/* Sidebar for larger screens */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 50, 
          left: 0, 
          height: '100vh', 
          zIndex: 1, 
          width: isSidebarOpen ? '17rem' : '5rem', // Adjust width dynamically
          overflowY: "auto",
          transition: 'width 0.3s ease', // Smooth transition for width
          scrollbarWidth: "thin",
          scrollbarColor: "#22D3EE #f0f0f0",
          backgroundColor: "white"
        }}
      >
        <Sidebar
          width="rem"
          sx={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            display: { xs: "none", md: "block" }, // Hidden on smaller screens
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            '&::-webkit-scrollbar': {
              width: '1px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f0f0f0',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
            Msidiya
          </Logo>
          <Menu>
            {isSidebarOpen ? (
              <>
                <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher">
                  Dashboard
                </MenuItem>
                <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile">
                  Profile
                </MenuItem>
                <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price">
                  Set categories
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
              </>
            ) : (
              <>
                <MenuItem icon={<DashboardIcon />} link="/dashboard/teacher" />
                <MenuItem icon={<PersonIcon />} link="/dashboard/teacher/profile" />
                <MenuItem icon={<AttachMoneyIcon />} link="/dashboard/teacher/set-price" />
                <MenuItem icon={<GroupIcon />} link="/dashboard/teacher/group-classes" />
                <MenuItem icon={<CalendarTodayIcon />} link="/dashboard/teacher/set-availability" />
                <MenuItem icon={<BookIcon />} link="/dashboard/teacher/courses-manager" />
                <MenuItem icon={<ReceiptIcon />} link="/dashboard/teacher/course-transactions" />
                <MenuItem icon={<EventIcon />} link="/dashboard/teacher/upcoming-appointments" />
                <MenuItem icon={<LocalOfferIcon />} link="/dashboard/teacher/coupons-manager" />
                <MenuItem icon={<PaymentIcon />} link="/dashboard/teacher/payment" />
                <MenuItem icon={<MonetizationOnIcon />} link="/dashboard/teacher/payout" />
              </>
            )}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;
