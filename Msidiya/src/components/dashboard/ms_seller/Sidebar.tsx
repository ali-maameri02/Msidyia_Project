import React, { useState, useMemo, lazy } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  Logo,
} from "react-mui-sidebar";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import msidiyalogo from "../../../assets/msidiya.png";
import { Link } from "react-router-dom";
interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const menuItems = useMemo(
    () => [
      {
        icon: <DashboardIcon />,
        link: "/dashboardseller/seller/",
        label: "Dashboard",
      },
      {
        icon: <PersonIcon />,
        link: "/dashboardseller/seller/profile",
        label: "Profile",
      },
      {
        icon: <ReceiptLongIcon />,
        link: "/dashboardseller/seller/MyTransaction",
        label: "Transactions",
      },
      {
        icon: <AttachMoneyIcon />,
        link: "/dashboardseller/seller/payment",
        label: "Payment",
      },
    ],
    []
  );

  return (
    <>
      {/* Toggle button for smaller screens */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        sx={{
          display: { xs: "block", md: "block" }, // Show only on small screens
          position: "fixed",
          top: 6,
          left: 16,
          zIndex: 9999999,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar for larger screens */}
      <div
        style={{
          position: "fixed",
          top: 50,
          left: 0,
          height: "100vh",
          zIndex: 1,
          width: isSidebarOpen ? "17rem" : "4rem", // Adjust width dynamically
          overflowY: "auto",
          transition: "width 0.3s ease", // Smooth transition for width
          backgroundColor: "white",
        }}
      >
        <Sidebar
          sx={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            display: { xs: "none", md: "block" }, // Hidden on smaller screens
          }}
        >
          <Logo img={msidiyalogo}>Msidiya</Logo>
          <Menu>
            {menuItems.map((item) => (
              <MenuItem key={item.link} icon={item.icon} link={item.link}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;
