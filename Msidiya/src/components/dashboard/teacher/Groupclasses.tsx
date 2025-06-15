import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Container,
  useTheme,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import {
  useGroupClasses,
  useDeleteGroupClass,
} from "../../../services/group_classes/group_classes.queries";
import { GroupClass } from "../../../services/group_classes/group_classes.types";

const Groupclasses: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const { data: groupClasses, isLoading } = useGroupClasses();
  const deleteGroupClass = useDeleteGroupClass();

  // Filter classes for the current tutor
  const tutorClasses =
    groupClasses?.filter((cls: GroupClass) => cls.tutor === user?.id) || [];

  // Filter classes based on search query
  const filteredClasses = tutorClasses.filter((cls) =>
    cls.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics
  const totalClasses = tutorClasses.length;
  const activeClasses = tutorClasses.filter(
    (cls) => cls.status === "Visible"
  ).length;
  const totalStudents = tutorClasses.reduce(
    (sum, cls) => sum + cls.max_book,
    0
  );
  const totalRevenue = tutorClasses.reduce((sum, cls) => sum + cls.price, 0);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteGroupClass.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting group class:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "main_image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={params.value}
            alt="Class"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: theme.palette.success.main,
          }}
        >
          ${params.value}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      valueGetter: (params: GroupClass) => {
        return params.category || "";
      },
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.main,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: "max_book",
      headerName: "Max Students",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PeopleIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "class_type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: theme.palette.info.light,
            color: theme.palette.info.main,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: "last_time",
      headerName: "Duration",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={
            params.value === "Visible" ? <CheckCircleIcon /> : <CancelIcon />
          }
          label={params.value === "Visible" ? "Active" : "Hidden"}
          size="small"
          sx={{
            backgroundColor:
              params.value === "Visible"
                ? theme.palette.success.light
                : theme.palette.error.light,
            color:
              params.value === "Visible"
                ? theme.palette.success.main
                : theme.palette.error.main,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: "date_created",
      headerName: "Created On",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            size="small"
            title="Edit"
            onClick={() =>
              navigate(`/dashboard/teacher/group-classes/update/${params.id}`)
            }
            sx={{
              backgroundColor: theme.palette.primary.light,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            title="Delete"
            onClick={() => handleDelete(params.id as number)}
            disabled={deleteGroupClass.isPending}
            sx={{
              backgroundColor: theme.palette.error.light,
              "&:hover": {
                backgroundColor: theme.palette.error.main,
                color: "white",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Group Classes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your group classes, track performance, and handle student
          enrollments
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Classes
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {totalClasses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Active Classes
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  {activeClasses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  {totalStudents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  ${totalRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Add Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <TextField
            placeholder="Search classes..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate(`/dashboard/teacher/group-classes/add`)}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Add New Class
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <DataGrid
          rows={filteredClasses}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          checkboxSelection
          disableColumnMenu
          density="comfortable"
          getRowId={(row) => row.id}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderColor: theme.palette.divider,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.default,
              borderBottom: `2px solid ${theme.palette.divider}`,
              borderRadius: "8px 8px 0 0",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${theme.palette.divider}`,
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Groupclasses;
