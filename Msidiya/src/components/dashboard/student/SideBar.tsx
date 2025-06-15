import React, { useState, useMemo } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TelegramIcon from "@mui/icons-material/Telegram";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Payment } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import msidiyalogo from "../../../assets/msidiya.png";
import { useAuth } from "../../../hooks/useAuth";

interface SidebarItem {
  icon: JSX.Element;
  label: string;
  link?: string;
  nested?: { icon: JSX.Element; label: string; link: string }[];
}

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const drawerWidth = 240;

const SidebarApp: React.FC<SidebarAppProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const { logout } = useAuth();

  // Shared style for list items
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

  const handleToggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleLogout = () => {
    logout();
  };

  // Menu Items
  const menuItems = useMemo<SidebarItem[]>(
    () => [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        link: "/dashboardstudent/student",
      },
      {
        icon: <PersonIcon />,
        label: "Profile",
        link: "/dashboardstudent/student/profile",
      },
    ],
    []
  );

  const appointmentsItems = useMemo<SidebarItem[]>(
    () => [
      {
        icon: <EventIcon />,
        label: "Appointments",
        nested: [
          {
            icon: <EventIcon />,
            label: "Upcoming Appointments",
            link: "/dashboardstudent/student/Upcoming-Appointments",
          },
          {
            icon: <GroupIcon />,
            label: "Favorite Tutors",
            link: "/dashboardstudent/student/Favorite-tutor",
          },
          {
            icon: <ClassIcon />,
            label: "Favorite Group Class",
            link: "/dashboardstudent/student/Favorite-Groupe-Class",
          },
        ],
      },
    ],
    []
  );

  const transactionsItems = useMemo<SidebarItem[]>(
    () => [
      {
        icon: <Payment />,
        label: "Payment",
        nested: [
          {
            icon: <ReceiptLongIcon />,
            label: "My Courses",
            link: "/dashboardstudent/student/My-Courses",
          },
          {
            icon: <EventIcon />,
            label: "My Transaction",
            link: "/dashboardstudent/student/My-Transaction",
          },
          {
            icon: <ShoppingCartIcon />,
            label: "Shopping Cart",
            link: "/dashboardstudent/student/Shopping-Cart",
          },
        ],
      },
    ],
    []
  );

  const notificationsItems = useMemo<SidebarItem[]>(
    () => [
      {
        icon: <NotificationsActiveIcon />,
        label: "Notification",
        link: "/dashboardstudent/student/Notification",
      },
      {
        icon: <TelegramIcon />,
        label: "Messages",
        link: "/dashboardstudent/student/Messages",
      },
    ],
    []
  );

  return (
    <>
      {/* Toggle Button for small screens */}
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
          zIndex: 1300, // above drawer zIndex
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: isMobile ? 0 : 50,
            height: isMobile ? "100vh" : "90vh",
            backgroundColor: "#fff",
            borderRight: "1px solid #e0e0e0",
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
        {/* Logo */}
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

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.link}
              component={NavLink}
              to={item.link!}
              sx={listItemStyle}
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
            </ListItemButton>
          ))}
        </List>

        {/* Appointments */}
        <List>
          {appointmentsItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => handleToggleGroup(`appointments-${index}`)}
                sx={listItemStyle}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
              </ListItemButton>
              {item.nested && (
                <Collapse
                  in={!!openGroups[`appointments-${index}`]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.nested.map((nestedItem, nestedIndex) => (
                      <ListItemButton
                        key={nestedIndex}
                        component={NavLink}
                        to={nestedItem.link}
                        sx={{ ...listItemStyle, pl: 4 }}
                      >
                        {nestedItem.icon}
                        <ListItemText
                          primary={nestedItem.label}
                          sx={{ marginLeft: 2 }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Transactions */}
        <List>
          {transactionsItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => {
                  if (item.nested) {
                    handleToggleGroup(`transactions-${index}`);
                  } else if (item.link) {
                    navigate(item.link);
                  }
                }}
                sx={listItemStyle}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
              </ListItemButton>
              {item.nested && (
                <Collapse
                  in={!!openGroups[`transactions-${index}`]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.nested.map((nestedItem, nestedIndex) => (
                      <ListItemButton
                        key={nestedIndex}
                        component={NavLink}
                        to={nestedItem.link}
                        sx={{ ...listItemStyle, pl: 4 }}
                      >
                        {nestedItem.icon}
                        <ListItemText
                          primary={nestedItem.label}
                          sx={{ marginLeft: 2 }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Notifications */}
        <List>
          {notificationsItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.link!}
              sx={listItemStyle}
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
            </ListItemButton>
          ))}
        </List>

        {/* Spacer to push logout down */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout */}
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
