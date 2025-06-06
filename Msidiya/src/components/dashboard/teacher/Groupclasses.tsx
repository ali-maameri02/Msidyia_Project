import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { GridValueGetter } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import AddGroupClass from './AddGroupClass';
interface GroupClass {
  id: number;
  title: string;
  // age_range: string;
  grade: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  max_book: number;
  class_type: string;
  main_image: string;
  date_created: string;
  status: string;
  last_time: string;
  tutor: number;

}


const Groupclasses: React.FC = () => {
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>([]);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (user?.is_tutor) {
      console.log("Tutor details:", user.tutor_details);
  } else {
      console.log("User is not a tutor.");
  }
  useEffect(() => {
    const fetchGroupClasses = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return;

        const loggedInUser = JSON.parse(storedUser);
        const tutorId = loggedInUser?.id;

        const response = await axios.get('http://127.0.0.1:8000/api/group-classes/');
        const filteredClasses = response.data.filter((cls: GroupClass) => cls.tutor === tutorId);

        setGroupClasses(filteredClasses);
      } catch (error) {
        console.error('Error fetching group classes:', error);
      }
    };

    fetchGroupClasses();
  }, []);
// Delete group class
const handleDelete = async (id: number) => {
  if (window.confirm('Are you sure you want to delete this class?')) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/group-classes/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setGroupClasses(groupClasses.filter(cls => cls.id !== id));
    } catch (error) {
      console.error('Error deleting group class:', error);
    }
  }
};
const columns: GridColDef[] = [
  {
    field: 'main_image',
    headerName: 'Main Image',
    width: 80,
    renderCell: (params) => (
      <img 
        src={params.value} 
        alt="Class" 
        loading="lazy"
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />
    ),
  },
  { field: 'title', headerName: 'Title', width: 250 },
  // { field: 'age_range', headerName: 'Age Range', width: 100 },
  { field: 'grade', headerName: 'Grade', width: 120 },
  { field: 'price', headerName: 'Price', width: 80 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'max_book', headerName: 'Max Book', width: 100 },
  { field: 'class_type', headerName: 'Class Type', width: 120 },
  { field: 'last_time', headerName: 'Last Time', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: (params) => (
      params.value === 'Visible' ? (
        <CheckCircleIcon style={{ color: 'green' }} />
      ) : (
        <CancelIcon style={{ color: 'red' }} />
      )
    ),
  },
  { field: 'date_created', headerName: 'Created On', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 130,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton color="secondary" title="Edit" onClick={() => navigate(`/dashboard/teacher/group-classes/update/${params.id}`)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" title="Delete" onClick={() => handleDelete(params.id as number)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

  return (
    <div className="mt-16 ml-12 h-full ">
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',paddingLeft:'2rem', }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Group Classes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => { navigate(`/dashboard/teacher/group-classes/add`) }}
        >
          Add
        </Button>
      </Box>
      <Paper sx={{ width: '60rem', paddingLeft: '2rem' }}>
        <DataGrid
          rows={groupClasses.map((cls) => ({
            ...cls,
            id: cls.id,
          }))}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 20, 50]} // Larger page size for faster scrolling
          checkboxSelection
          disableColumnMenu
          // disableSelectionOnClick
          density="compact"
          getRowId={(row) => row.id}
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Groupclasses;
