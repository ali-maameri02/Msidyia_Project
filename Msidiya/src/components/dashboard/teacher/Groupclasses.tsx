import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Container,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import {
  useGroupClasses,
  useDeleteGroupClass,
} from "../../../services/group_classes/group_classes.queries";
import { GroupClass } from "../../../services/group_classes/group_classes.types";

const Groupclasses: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const { data: groupClasses, isLoading } = useGroupClasses();
  const deleteGroupClass = useDeleteGroupClass();

  // Filter classes for the current tutor
  const tutorClasses =
    groupClasses?.filter((cls: GroupClass) => cls.tutor === user?.id) || [];

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
        <img
          src={params.value}
          alt="Class"
          loading="lazy"
          style={{
            width: 50,
            height: 50,
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          ${params.value}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      valueGetter: (params: GridValueGetterParams<GroupClass>) => {
        const category = params.row?.category;
        return category ? category.name : "";
      },
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "max_book",
      headerName: "Max Students",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "class_type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: params.value === "Visible" ? "success.main" : "error.main",
          }}
        >
          {params.value === "Visible" ? (
            <>
              <CheckCircleIcon fontSize="small" />
              <Typography variant="body2">Active</Typography>
            </>
          ) : (
            <>
              <CancelIcon fontSize="small" />
              <Typography variant="body2">Hidden</Typography>
            </>
          )}
        </Box>
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
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            title="Delete"
            onClick={() => handleDelete(params.id as number)}
            disabled={deleteGroupClass.isPending}
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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Group Classes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate(`/dashboard/teacher/group-classes/add`)}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
          }}
        >
          Add New Class
        </Button>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <DataGrid
          rows={tutorClasses}
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
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Groupclasses;
