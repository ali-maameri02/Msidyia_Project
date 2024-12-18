import React, { useState } from "react";
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

const UpcomingAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const columns: GridColDef[] = [
    { field: "userName", headerName: "User name", flex: 1 },
    { field: "subject", headerName: "Subject / Group Class", flex: 1.5 },
    { field: "enrollType", headerName: "Enroll type", flex: 1 },
    { field: "paid", headerName: "Paid", flex: 0.5 },
    { field: "lessonType", headerName: "Lesson Type", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "toTime", headerName: "To Time", flex: 1 },
    { field: "createdOn", headerName: "Created On", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const oneOnOneRows = [
    {
      id: 1,
      userName: "Priya",
      subject: "Social Media Marketing",
      enrollType: "subject",
      paid: "Yes",
      lessonType: "Paid Lesson",
      startTime: "11/04/2024, 14:00PM",
      toTime: "11/04/2024, 15:00PM",
      createdOn: "Apr 11, 2024",
      status: "Completed",
    },
    // Add more rows as needed
  ];

  const groupClassRows = [
    {
      id: 1,
      userName: "Priya",
      subject: "Bharatanatyam",
      enrollType: "Group",
      paid: "Yes",
      lessonType: "Paid Lesson",
      startTime: "10/04/2024, 12:50PM",
      toTime: "10/04/2024, 13:10PM",
      createdOn: "Apr 10, 2024",
      status: "Completed",
    },
    // Add more rows as needed
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
        aria-label="Upcoming Appointments Tabs"
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
          rows={activeTab === 0 ? oneOnOneRows : groupClassRows}
          columns={columns}
          autoHeight
       
          
        />
      </Box>
    </Box></div>
  );
};

export default UpcomingAppointments;
