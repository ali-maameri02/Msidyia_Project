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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import ClassIcon from "@mui/icons-material/Class";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ReviewsOutlined } from "@mui/icons-material";
import { useNavigate, NavLink } from "react-router-dom";
import msidiyalogo from "../../../assets/msidiya.png";
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
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { logout } = useAuth();

  const handleToggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

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
        link: "/dashboard/teacher",
        label: "Dashboard",
      },
      {
        icon: <PersonIcon />,
        link: "/dashboard/teacher/profile",
        label: "Profile",
      },
    ],
    []
  );

  const groupClassesItems = useMemo(
    () => ({
      label: "Group Classes",
      icon: <GroupIcon />,
      nested: [
        {
          icon: <ClassIcon />,
          link: "/dashboard/teacher/group-classes",
          label: "My Group Classes",
        },
        {
          icon: <CategoryIcon />,
          link: "/dashboard/teacher/set-categories",
          label: "Set Categories",
        },
        {
          icon: <ReviewsOutlined />,
          link: "/dashboard/teacher/group-classes/reviews",
          label: "Reviews",
        },
      ],
    }),
    []
  );

  const paymentsItems = useMemo(
    () => ({
      label: "Payments",
      icon: <AttachMoneyIcon />,
      nested: [
        {
          icon: <ReceiptLongIcon />,
          link: "/dashboard/teacher/group-class-transactions",
          label: "Group Class Transactions",
        },
        {
          icon: <PaymentIcon />,
          link: "/dashboard/teacher/payment",
          label: "Payment",
        },
        {
          icon: <MonetizationOnIcon />,
          link: "/dashboard/teacher/payout",
          label: "Payout",
        },
      ],
    }),
    []
  );

  const appointmentsItems = useMemo(
    () => ({
      label: "Appointments",
      icon: <EventIcon />,
      nested: [
        {
          icon: <EventIcon />,
          link: "/dashboard/teacher/upcoming-appointments",
          label: "Upcoming Appointments",
        },
        {
          icon: <EditIcon />,
          link: "/dashboard/teacher/coupons-manager",
          label: "Coupons Manager",
        },
      ],
    }),
    []
  );

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
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
        {menuItems.map(({ icon, label, link }) => (
          <ListItemButton
            key={label}
            component={NavLink}
            to={link}
            sx={listItemStyle}
          >
            {icon}
            <ListItemText primary={label} sx={{ marginLeft: 2 }} />
          </ListItemButton>
        ))}

        {/* Collapsible items */}
        {[groupClassesItems, appointmentsItems, paymentsItems].map(
          (item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => handleToggleGroup(item.label)}
                sx={listItemStyle}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />
              </ListItemButton>
              <Collapse
                in={!!openGroups[item.label]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.nested.map((nestedItem) => (
                    <ListItemButton
                      key={nestedItem.label}
                      sx={{ ...listItemStyle, pl: 4 }}
                      component={NavLink}
                      to={nestedItem.link}
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
            </React.Fragment>
          )
        )}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      {/* Logout button */}
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
    </Box>
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
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SidebarApp;
