import React, { useState, useMemo, lazy } from "react";
import { IconButton, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { Sidebar, Menu, MenuItem, Logo } from "react-mui-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import ClassIcon from "@mui/icons-material/Class";
import EditIcon from "@mui/icons-material/Edit";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TelegramIcon from "@mui/icons-material/Telegram";
import msidiyalogo from "../../../assets/msidiya.png";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = lazy(() => import("../../../components/dashboard/student/Student"));
const Profile = lazy(() => import("../../../components/dashboard/student/UserProfile"));

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

 

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // For navigation

  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  const menuItems = useMemo(() => (
    [
      {
        group: "Main",
        items: [
          { icon: <DashboardIcon />, text: "Dashboard", link: "/dashboardstudent/student" },
          { icon: <PersonIcon />, text: "Profile", link: "/dashboardstudent/student/profile" },
        ],
      },
      {
        group: "Appointments",
        items: [
          { icon: <EventIcon />, text: "Upcoming Appointments", link: "/dashboardstudent/student/Upcoming-Appointments" },
          {
            icon: <GroupIcon />, text: "Favorite Tutor", link: "/dashboardstudent/student/Favorite-tutor", nested: [
              { icon: <ClassIcon />, text: "Favorite Group Class", link: "/dashboardstudent/student/Favorite-Groupe-Class" },
            ]
          }
        ],
      },
      {
        group: "Transactions",
        items: [
          { icon: <AttachMoneyIcon />, text: "My Transaction", link: "/dashboardstudent/student/My-Transaction" },
          { icon: <ReceiptLongIcon />, text: "My Courses", link: "/dashboardstudent/student/My-Courses" },
        ],
      },
      {
        group: "Requests",
        items: [
          { icon: <EditIcon />, text: "Refund Request", link: "/dashboardstudent/student/Refund-Request" },
        ],
      },
      {
        group: "Notifications",
        items: [
          { icon: <NotificationsActiveIcon />, text: "Notification", link: "/dashboardstudent/student/Notification" },
          { icon: <TelegramIcon />, text: "Messages", link: "/dashboardstudent/student/Messages" },
        ],
      },
    ]
  ), []);

  const handleGroupClick = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

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
          zIndex: 99999,
          width: isSidebarOpen ? "17rem" : "4rem", // Adjust width dynamically
          overflowY: "auto",
          transition: "width 0.3s ease", // Smooth transition for width
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
          }}
        >
          <Logo img={msidiyalogo}>Msidiya</Logo>
          {menuItems.map((group, index) => (
            <div key={index}>
              <Menu>
                <h3
                  style={{ marginLeft: 16, marginBottom: 8, cursor: "pointer" }}
                  onClick={() => handleGroupClick(group.group)}
                >
                  {group.group}
                </h3>
                {openGroups[group.group] && (
                  <List>
                    {group.items.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        <MenuItem icon={item.icon} link={item.link}>
                          {item.text}
                        </MenuItem>
                        {item.nested && (
                          <Collapse in={openGroups[group.group]} timeout="auto" unmountOnExit>
                            {item.nested.map((nestedItem, nestedIndex) => (
                              <MenuItem key={nestedIndex} icon={nestedItem.icon} link={nestedItem.link}>
                                {nestedItem.text}
                              </MenuItem>
                            ))}
                          </Collapse>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                )}

              </Menu>

            </div>
            
          ))}
          <div className=" flex flex-row justify-center align-middle px-5 p-3 m-2 rounded-lg w-full hover:bg-red-500 hover:text-white " >
           <button onClick={handleLogout}>Logout</button>
                                       <LogoutOutlinedIcon/>
                                       </div>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarApp;
