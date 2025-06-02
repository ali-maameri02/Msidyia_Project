import "./style.css";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";

// Define TypeScript interfaces
interface User {
  id: number;
  username: string;
  email: string;
}

interface Schedule {
  id: number;
  date: string;
  duration: string;
  session_link: string | null;
}

interface GroupClass {
  id: number;
  title: string;
  grade: string;
  price: string;
  category: number;
  max_book: number;
  class_type: string;
  main_image: string;
  status: string;
  last_time: string;
  schedules: Schedule[];
  tutor: User;
}

interface StudentPayment {
  id: number;
  student: number;
  group_class: GroupClass;
  amount: string;
  status: string;
  checkout_url: string | null;
  created_on: string;
}

const UpcomingAppointments: React.FC = () => {
  const [viewDataVisible, setViewDataVisible] = React.useState(false); // Group Classes
  const [viewDataVisible1, setViewDataVisible1] = React.useState(false); // One-on-One Classes
  const [popUp, setPopUp] = React.useState(false);
  const [payments, setPayments] = React.useState<StudentPayment[]>([]);
  const [studentId, setStudentId] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch student ID from local storage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setStudentId(user.id); // Set the student ID
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    } else {
      console.warn("No user data found in local storage.");
    }
  }, []);

  // Fetch student payments when studentId is set
  React.useEffect(() => {
    const fetchStudentPayments = async () => {
      if (!studentId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://msidiya.com/api/student-payments/${studentId}/`);
        setPayments(response.data as StudentPayment[]);
      } catch (error) {
        setError("Error fetching student payments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentPayments();
  }, [studentId]);

  const handleViewDataClick = () => {
    setViewDataVisible(false);
    setViewDataVisible1(true);
  };

  const handleViewDataClick1 = () => {
    setViewDataVisible1(false);
    setViewDataVisible(true);
  };

  const popUpCard = () => {
    setPopUp(!popUp);
  };

  // Define columns for the DataGrid
  const groupClassesColumns: GridColDef[] = [
    { field: "tutorName", headerName: "Tutor Name", width: 150 },
    { field: "groupClassTitle", headerName: "Group Class", width: 200 },
    { field: "enrollType", headerName: "Enroll Type", width: 150 },
    {
      field: "lessonType",
      headerName: "Lesson Type",
      width: 150,
      renderCell: () => (
        <Box
          sx={{
            bgcolor: "error.light",
            color: "error.main",
            p: 1,
            borderRadius: 1,
          }}
        >
          Paid Lesson
        </Box>
      ),
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 100,
      align: "center",
      renderCell: () => (
        <Box
          sx={{
            bgcolor: "success.light",
            color: "success.main",
            p: 1,
            borderRadius: 1,
          }}
        >
          Yes
        </Box>
      ),
    },
    { field: "startTime", headerName: "Start Time", width: 150 },
    { field: "toTime", headerName: "To Time", width: 150 },
    { field: "createdOn", headerName: "Created On", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            bgcolor: "success.light",
            color: "success.main",
            p: 1,
            borderRadius: 1,
          }}
        >
          {params.row.status}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: () => (
        <IconButton>
          <PreviewIcon />
        </IconButton>
      ),
    },
  ];

  const oneOnOneClassesColumns: GridColDef[] = [
    { field: "tutorName", headerName: "Tutor Name", width: 150 },
    { field: "classTitle", headerName: "Class Title", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => (
        <button
          onClick={popUpCard}
          className="cursor-pointer bg-green-400 font-semibold text-green-600 rounded-lg p-2"
        >
          View List Appointments
        </button>
      ),
    },
  ];

  // Transform payments into rows for DataGrid
  const groupClassesRows = payments
    .filter((payment) => payment.group_class.max_book > 1)
    .map((payment) => ({
      id: payment.id,
      tutorName: payment.group_class.tutor.username,
      groupClassTitle: payment.group_class.title,
      enrollType: "Group",
      startTime: payment.group_class.schedules[0]?.date || "N/A",
      toTime: payment.group_class.schedules[0]?.date || "N/A",
      createdOn: payment.created_on,
      status: payment.status,
    }));

  const oneOnOneClassesRows = payments
    .filter((payment) => payment.group_class.max_book === 1)
    .map((payment) => ({
      id: payment.id,
      tutorName: payment.group_class.tutor.username,
      classTitle: payment.group_class.title,
    }));

  return (
    <main className="mt-16 ml-16">
      <div className="grid grid-cols-1 gap-y-6">
        {/* Buttons for switching views */}
        <div className="first-column border-b-2">
          <button className="btn" onClick={handleViewDataClick1}>
            One on One Classes
          </button>
          <button className="btn" onClick={handleViewDataClick}>
            Group Classes
          </button>
        </div>

        {/* Filters */}
        <div className="second-column">
          <select name="days" id="days" className="feild-form">
            <option value="All Days">All Days</option>
            <option value="today">Today</option>
            <option value="this week">This week</option>
          </select>
          <input
            className="searching"
            placeholder="search : tutor,user,subject,groupclass"
          />
        </div>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <>
            {/* Group Classes Table */}
            {viewDataVisible1 && (
              <div className="third-column">
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={groupClassesRows}
                    columns={groupClassesColumns}
                    // pageSize={5}
                    // rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                    // disableSelectionOnClick
                    autoHeight
                  />
                </Box>
              </div>
            )}

            {/* One-on-One Classes Table */}
            {viewDataVisible && (
              <div className="third-column">
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={oneOnOneClassesRows}
                    columns={oneOnOneClassesColumns}
                    // pageSize={5}
                    // rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                    // disableSelectionOnClick
                    autoHeight
                  />
                </Box>
                {popUp && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      p: 2,
                      color: "white",
                      mt: 2,
                    }}
                  >
                    <Typography variant="h6">
                      List Appointments of Deep Tissue Massage Class
                      <IconButton onClick={popUpCard} sx={{ ml: 2 }}>
                        <CancelOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Typography>
                    <Box sx={{ height: 400, width: "100%", mt: 2 }}>
                      <DataGrid
                        rows={oneOnOneClassesRows}
                        columns={oneOnOneClassesColumns}
                        // pageSize={5}
                        // rowsPerPageOptions={[5]}
                        checkboxSelection={false}
                        // disableSelectionOnClick
                        autoHeight
                      />
                    </Box>
                  </Box>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default UpcomingAppointments;