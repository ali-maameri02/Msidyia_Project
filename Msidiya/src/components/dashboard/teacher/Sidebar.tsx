import React, { useState, useMemo, Suspense, lazy } from "react";
import { Sidebar, Menu, MenuItem, Logo } from "react-mui-sidebar";
import { Drawer, IconButton, List, ListItem, ListItemText, Collapse } from "@mui/material";
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
import msidiyalogo from "../../../assets/msidiya.png";
import { Link,useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// Lazy loading of pages
const Dashboard = lazy(() => import("../../../components/dashboard/teacher/Teacher"));
const Profile = lazy(() => import("../../../components/dashboard/teacher/UserProfile"));
const SetCategories = lazy(() => import("../../../components/dashboard/teacher/Setcategories"));

interface SidebarAppProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarApp: React.FC<SidebarAppProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [openGroupClasses, setOpenGroupClasses] = useState(false);
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openPayements, setOpenPayements] = useState(false);

  const handleGroupClassesClick = () => setOpenGroupClasses(!openGroupClasses);
  const handleAppointmentsClick = () => setOpenAppointments(!openAppointments);
  const handlePayementsClick = () => setOpenPayements(!openPayements);
  const navigate = useNavigate(); // For navigation

  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
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

  ], []);
  const PayementItems = useMemo(() => [
    { icon: <ReceiptLongIcon />, link: "/dashboard/teacher/group-class-transactions", label: "Group Class Transactions" },
    { icon: <PaymentIcon />, link: "/dashboard/teacher/payment", label: "Payment" },
    { icon: <MonetizationOnIcon />, link: "/dashboard/teacher/payout", label: "Payout" }
  ], []);

  const appointmentsItems = useMemo(() => [
    { link: "/dashboard/teacher/upcoming-appointments", label: "Upcoming Appointments" },
    { link: "/dashboard/teacher/coupons-manager", label: "Coupons Manager" }
  ], []);

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
            display: { xs: "none", md: "block" }, // Hidden on smaller screens
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
            "&::-webkit-scrollbar": {
              width: "1px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f0f0f0",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <Logo img={msidiyalogo}>Msidiya</Logo>
          <Menu>
            {menuItems.map(item => (
              <MenuItem key={item.link} icon={item.icon} link={item.link}>
                {item.label}
              </MenuItem>
            ))}

            {/* Manage Group Classes Section */}
            <List>
            <ListItem
  button
  onClick={handleGroupClassesClick}
  sx={{
    width: '100%',
    padding: '0.5rem 0.5rem',
    display: 'flex',
    flexDirection: 'row',
    borderRadius:'0.5rem',
    flexWrap:'nowrap',
    justifyContent: 'space-around',
    ":hover": {
      backgroundColor: '#5d87ff20',
      color:'#5d87ff'
    },
  }}className=" ml-0"
>

                <GroupIcon />
                <ListItemText primary="Manage Group Classes" />
              </ListItem>
              <Collapse in={openGroupClasses} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {groupClassesItems.map(item => (
                    <ListItem key={item.link} button component={Link} to={item.link}>
                      {item.icon}
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>

            {/* Manage Appointments Section */}
            <List>
              <ListItem button 
              onClick={handleAppointmentsClick}  sx={{
                width: '100%',
                padding: '0.5rem 0.5rem',
                display: 'flex',
                flexDirection: 'row',
                borderRadius:'0.5rem',
                flexWrap:'nowrap',
                justifyContent: 'space-around',
                ":hover": {
                  backgroundColor: '#5d87ff20',
                  color:'#5d87ff'
                   // Replace with your desired color, e.g., '#f0f0f0'
                },
              }}
              
               >
                <EventIcon />
                <ListItemText primary="Manage Appointments" />
              </ListItem>
              <Collapse in={openAppointments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {appointmentsItems.map(item => (
                    <ListItem key={item.link} button component={Link} to={item.link}>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>

            <List>
              <ListItem button onClick={handlePayementsClick} sx={{
                width: '100%',
                padding: '0.5rem 0.5rem',
                display: 'flex',
                flexDirection: 'row',
                borderRadius:'0.5rem',
                flexWrap:'nowrap',
                justifyContent: 'space-around',
                ":hover": {
                  backgroundColor: '#5d87ff20',
                  color:'#5d87ff'
                   // Replace with your desired color, e.g., '#f0f0f0'
                },
              }}
  >
                <AttachMoneyIcon />
                <ListItemText primary="Manage Payement" />
              </ListItem>
              <Collapse in={openPayements} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {PayementItems.map(item => (
                    <ListItem key={item.link} button component={Link} to={item.link}>
                      {item.icon}
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Menu>
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
