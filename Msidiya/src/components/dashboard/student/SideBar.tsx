import React, { useState, useMemo } from "react";
import { Sidebar, Menu, MenuItem, Logo } from "react-mui-sidebar";
import { 
  IconButton, 
  List, 
  ListItemButton, 
  ListItemText, 
  Collapse 
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
import msidiyalogo from "../../../assets/msidiya.png";
import { Link, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Payment } from "@mui/icons-material";

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

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  
  // Shared sx style for all ListItemButton components
  const listItemStyle = {
    px: 2,
    py: 1.5,
    borderRadius: 1,
    my: 0.5,
    color: '#374151',
    '&:hover': {
      backgroundColor: '#5d87ff20',
      color: '#635BFF',
    },
  };

  // Handlers
  const handleToggleGroup = (groupName: string) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [groupName]: !prevState[groupName],
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Menu Items
  const menuItems = useMemo<SidebarItem[]>(() => [
    { icon: <DashboardIcon />, label: "Dashboard", link: "/dashboardstudent/student" },
    { icon: <PersonIcon />, label: "Profile", link: "/dashboardstudent/student/profile" },
  ], []);

  const appointmentsItems = useMemo<SidebarItem[]>(() => [
    {
      icon: <EventIcon />,
      label: "Appointments",
      nested: [
        { icon: <EventIcon />, label: "Upcoming Appointments", link: "/dashboardstudent/student/Upcoming-Appointments" },
        { icon: <GroupIcon />, label: "Favorite Tutors", link: "/dashboardstudent/student/Favorite-tutor" },
        { icon: <ClassIcon />, label: "Favorite Group Class", link: "/dashboardstudent/student/Favorite-Groupe-Class" },
      ],
    },
  ], []);

  const transactionsItems = useMemo<SidebarItem[]>(() => [
    {
      icon: <Payment />,
      label: "Payment",
      nested: [
        { icon: <ReceiptLongIcon />, label: "My Courses", link: "/dashboardstudent/student/My-Courses" },
        { icon: <EventIcon />, label: "My Transaction", link: "/dashboardstudent/student/My-Transaction" },
        { icon: <ShoppingCartIcon />, label: "Shopping Cart", link: "/dashboardstudent/student/Shopping-Cart" },
      ],
    },
  ], []);

  const notificationsItems = useMemo<SidebarItem[]>(() => [
    { icon: <NotificationsActiveIcon />, label: "Notification", link: "/dashboardstudent/student/Notification" },
    { icon: <TelegramIcon />, label: "Messages", link: "/dashboardstudent/student/Messages" },
  ], []);

  return (
    <>
      {/* Toggle Button for Small Screens */}
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
          zIndex: 9999999,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar for Larger Screens */}
      <div
        style={{
          position: "fixed",
          top: 50,
          left: 0,
          height: "90vh",
          overflowX: "hidden",
          zIndex: 1,
          width: isSidebarOpen ? "17rem" : "4rem",
          overflowY: "auto",
          transition: "width 0.3s ease",
          scrollbarWidth: "thin",
          scrollbarColor: "#22D3EE #f0f0f0",
          backgroundColor: "white",
        }}
      >
        <Sidebar
          showProfile={false}
          sx={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            display: { xs: "none", md: "block" },
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            "&::-webkit-scrollbar": { width: "1px" },
            "&::-webkit-scrollbar-track": { background: "#f0f0f0" },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
          }}
        >
          <a href="/">

          <Logo img={msidiyalogo}>Msidiya</Logo>
          </a>
          <Menu>
            {/* Top-Level Menu Items */}
            {menuItems.map((item) => (
              <MenuItem
                key={item.link}
                icon={item.icon}
                link={item.link}
              >
                {item.label}
              </MenuItem>
            ))}

            {/* Appointments Section */}
            <List>
              {appointmentsItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    onClick={() => handleToggleGroup(`appointments-${index}`)}
                    sx={listItemStyle}
                  >
                    <span style={{ marginRight: 12 }}>{item.icon}</span>
                    <ListItemText primary={item.label} />
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
                            component={Link}
                            to={nestedItem.link}
                            sx={{
                              ...listItemStyle,
                              pl: 4, // Add indentation for nested items
                            }}
                          >
                            <span style={{ marginRight: 12 }}>{nestedItem.icon}</span>
                            <ListItemText primary={nestedItem.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>

            {/* Transactions Section */}
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
                    <span style={{ marginRight: 12 }}>{item.icon}</span>
                    <ListItemText primary={item.label} />
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
                            component={Link}
                            to={nestedItem.link}
                            sx={{
                              ...listItemStyle,
                              pl: 4, // Indent nested items
                            }}
                          >
                            <span style={{ marginRight: 12 }}>{nestedItem.icon}</span>
                            <ListItemText primary={nestedItem.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>

            {/* Notifications Section */}
            <List>
              {notificationsItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  component={Link}
                  to={item.link!}
                  sx={listItemStyle}
                >
                  <span style={{ marginRight: 12 }}>{item.icon}</span>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Menu>

          {/* Logout Button */}
          <div className="flex flex-row justify-center align-middle px-5 p-3 m-2 rounded-lg w-full hover:bg-red-500 hover:text-white">
            <button onClick={handleLogout}>Logout</button>
            <LogoutOutlinedIcon />
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;