import React, { useState, useMemo } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import ClassIcon from "@mui/icons-material/Class";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ReviewsOutlined } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [openGroupClasses, setOpenGroupClasses] = useState(false);
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openPayments, setOpenPayments] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = useMemo(() => [
    { icon: <DashboardIcon />, link: "/dashboard/teacher", label: "Dashboard" },
    { icon: <PersonIcon />, link: "/dashboard/teacher/profile", label: "Profile" },
  ], []);

  const groupClassesItems = useMemo(() => [
    { icon: <ClassIcon />, link: "/dashboard/teacher/group-classes", label: "My Group Classes" },
    { icon: <CategoryIcon />, link: "/dashboard/teacher/set-categories", label: "Set Categories" },
    { icon: <ReviewsOutlined />, link: "/dashboard/teacher/group-classes/reviews", label: "Reviews" },
  ], []);

  const paymentsItems = useMemo(() => [
    { icon: <ReceiptLongIcon />, link: "/dashboard/teacher/group-class-transactions", label: "Group Class Transactions" },
    { icon: <PaymentIcon />, link: "/dashboard/teacher/payment", label: "Payment" },
    { icon: <MonetizationOnIcon />, link: "/dashboard/teacher/payout", label: "Payout" }
  ], []);

  const appointmentsItems = useMemo(() => [
    { icon: <EventIcon />, link: "/dashboard/teacher/upcoming-appointments", label: "Upcoming Appointments" },
    { icon: <EditIcon />, link: "/dashboard/teacher/coupons-manager", label: "Coupons Manager" }
  ], []);

  // For responsive drawer open state on mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: "background.paper", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ justifyContent: isSidebarOpen ? "center" : "center", p: 2 }}>
        {/* You can add your logo here */}
        {isSidebarOpen && <Typography variant="h6" noWrap>Msidiya</Typography>}
      </Toolbar>
      <Divider />

      <List>
        {/* Simple menu items */}
        {menuItems.map(({ icon, label, link }) => (
          <ListItem key={label} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={link}
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary={label} />}
            </ListItemButton>
          </ListItem>
        ))}

        {/* Group Classes with collapse */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => setOpenGroupClasses(!openGroupClasses)}
            sx={{
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GroupIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Group Classes" />}
            {isSidebarOpen && (openGroupClasses ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openGroupClasses} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {groupClassesItems.map(({ icon, label, link }) => (
                <ListItemButton
                  key={label}
                  sx={{ pl: isSidebarOpen ? 4 : 2 }}
                  component={Link}
                  to={link}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  {isSidebarOpen && <ListItemText primary={label} />}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {/* Appointments with collapse */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => setOpenAppointments(!openAppointments)}
            sx={{
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <EventIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Appointments" />}
            {isSidebarOpen && (openAppointments ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openAppointments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {appointmentsItems.map(({ icon, label, link }) => (
                <ListItemButton
                  key={label}
                  sx={{ pl: isSidebarOpen ? 4 : 2 }}
                  component={Link}
                  to={link}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  {isSidebarOpen && <ListItemText primary={label} />}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {/* Payments with collapse */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => setOpenPayments(!openPayments)}
            sx={{
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AttachMoneyIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Payments" />}
            {isSidebarOpen && (openPayments ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openPayments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {paymentsItems.map(({ icon, label, link }) => (
                <ListItemButton
                  key={label}
                  sx={{ pl: isSidebarOpen ? 4 : 2 }}
                  component={Link}
                  to={link}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  {isSidebarOpen && <ListItemText primary={label} />}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      {/* Logout button */}
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Toggle button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: "fixed", top: 10, left: 10, zIndex: 1301 }}
        size="large"
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidthOpen },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SidebarApp;

// Don't forget to import ExpandLess, ExpandMore from @mui/icons-material for the collapse toggles
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
