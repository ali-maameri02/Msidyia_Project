import React, { useMemo } from "react";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import msidiyalogo from "../../../assets/msidiya.png";
import { Link, useNavigate } from "react-router-dom";

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

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
          display: { xs: "block", md: "block" },
          position: "fixed",
          top: 6,
          left: 16,
          zIndex: 1301, // above the sidebar
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar container */}
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 50,
          left: 0,
          height: "100vh",
          width: isSidebarOpen ? 272 : 64, // 17rem = 272px, 4rem = 64px
          bgcolor: "background.paper",
          boxShadow: 1,
          overflowY: "auto",
          transition: "width 0.3s ease",
          zIndex: 1200,
          display: { xs: "none", md: "block" }, // Hide on small screens
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 64,
            px: 2,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src={msidiyalogo}
            alt="Msidiya Logo"
            sx={{
              height: 40,
              width: 40,
              mr: isSidebarOpen ? 1.5 : 0,
              transition: "margin 0.3s ease",
            }}
          />
          {isSidebarOpen && (
            <Typography variant="h6" noWrap>
              Msidiya
            </Typography>
          )}
        </Box>

        {/* Menu Items */}
        <List disablePadding>
          {menuItems.map(({ icon, link, label }) => (
            <ListItemButton
              key={link}
              component={Link}
              to={link}
              sx={{
                px: 2,
                justifyContent: isSidebarOpen ? "initial" : "center",
                "&:hover": {
                  bgcolor: "#5d87ff20",
                  color: "#635BFF",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 2 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
                {icon}
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary={label} />}
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Logout Button */}
        <List disablePadding sx={{ mt: "auto" }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              px: 2,
              justifyContent: isSidebarOpen ? "initial" : "center",
              color: "error.main",
              "&:hover": {
                bgcolor: "error.main",
                color: "white",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 2 : "auto",
                justifyContent: "center",
                color: "inherit",
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};

export default SidebarApp;
