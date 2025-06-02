import React, { useEffect, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const UpcomingAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [groupClassRows, setGroupClassRows] = useState<any[]>([]);
  const [oneOnOneRows, setOneOnOneRows] = useState<any[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setActiveTab(newValue);
  };

  // Fetch schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // Get the logged-in tutor's ID from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return; // If no user found, exit

        const loggedInUser = JSON.parse(storedUser);
        const tutorId = loggedInUser?.id; // Ensure `id` exists

        const response = await axios.get("https://msidiya.com/api/schedules/");
        const schedules = response.data;

        const groupClasses = schedules
          .filter((schedule: any) => schedule.group_class.tutor === tutorId) // 🔹 Filter by tutor
          .map((schedule: any) => ({
            id: schedule.id,
            title: schedule.group_class.title,
            age_range: schedule.group_class.age_range,
            grade: schedule.group_class.grade,
            price: `$${schedule.group_class.price}`,
            category: schedule.category_name,
            max_book: schedule.group_class.max_book,
            class_type: schedule.group_class.class_type,
            date_created: new Date(schedule.group_class.date_created).toLocaleDateString(),
            status: schedule.group_class.status,
            last_time: new Date(schedule.group_class.last_time).toLocaleString(),
            session_link: schedule.session_link,
            schedule_date: new Date(schedule.date).toLocaleString(),
            duration: schedule.duration,
          }));

        // Separate Group Classes and One-on-One Sessions
        setGroupClassRows(groupClasses.filter((cls: { max_book: number; }) => cls.max_book !== 1));
        setOneOnOneRows(groupClasses.filter((cls: { max_book: number; }) => cls.max_book === 1));
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const columns: GridColDef[] = [
    // { field: "tutor", headerName: "Tutor", flex: 1 },
    { field: "title", headerName: "Group Class Title", flex: 1.5 },
    { field: "age_range", headerName: "Age Range", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "max_book", headerName: "Max Bookings", flex: 1 },
    { field: "class_type", headerName: "Class Type", flex: 1 },
    { field: "date_created", headerName: "Created On", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "last_time", headerName: "Last Time", flex: 1 },

    { field: "schedule_date", headerName: "Scheduled Date", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    {
      field: "session_link",
      headerName: "Session Link",
      flex: 1.5,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            Join Session
          </a>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <div className="ml-16 mt-16">
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Upcoming Appointments
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="One on One Sessions" />
          <Tab label="Group Classes" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {/* Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select defaultValue="All days" fullWidth>
              <MenuItem value="All days">All days</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="This Week">This Week</MenuItem>
            </Select>
            <TextField
              fullWidth
              placeholder="Search tutor, user, subject, group class"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* DataGrid */}
          <DataGrid
            rows={activeTab === 0 ? oneOnOneRows : groupClassRows} // Filtered Data
            columns={columns}
            sx={{ width: '55rem' }}
            autoHeight
          />
        </Box>
      </Box>
    </div>
  );
};

export default UpcomingAppointments;
