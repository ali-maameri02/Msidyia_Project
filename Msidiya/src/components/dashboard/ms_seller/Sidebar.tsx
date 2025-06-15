import React, { useMemo } from "react";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import msidiyalogo from "../../../assets/msidiya.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const drawerWidth = 240;

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    logout();
  };

  const listItemStyle = {
    px: 2,
    py: 1.2,
    borderRadius: "8px",
    mx: 1,
    my: 0.5,
    color: "#374151",
    "&:hover": {
      backgroundColor: "#eef2f6",
      color: "#1e293b",
    },
    "&.active": {
      backgroundColor: "#5d87ff",
      color: "white",
      "&:hover": {
        backgroundColor: "#537de8",
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
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
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 6,
          left: 16,
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: isMobile ? 0 : 50,
            height: isMobile ? "100vh" : "90vh",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fff",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "#f0f0f0" },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            cursor: "pointer",
            gap: 1,
          }}
          onClick={() => navigate("/")}
        >
          <img src={msidiyalogo} alt="Msidiya Logo" style={{ height: 40 }} />
          <Typography variant="h6" noWrap>
            Msidiya
          </Typography>
        </Box>

        <Divider />

        <List>
          {menuItems.map(({ icon, link, label }) => (
            <ListItemButton
              key={link}
              component={NavLink}
              to={link}
              sx={listItemStyle}
            >
              {icon}
              <ListItemText primary={label} sx={{ marginLeft: 2 }} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: "#c62828",
              "&:hover": {
                backgroundColor: "#ffebee",
              },
              "& .MuiSvgIcon-root": {
                color: "#c62828",
              },
            }}
          >
            <LogoutOutlinedIcon />
            <ListItemText
              primary="Logout"
              sx={{
                marginLeft: 2,
                "& .MuiTypography-root": { fontWeight: "bold" },
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>
    </>
  );
};

export default SidebarApp;
