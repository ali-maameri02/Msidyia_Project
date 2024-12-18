import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Outlet } from "react-router-dom";

interface ClassData {
  id: number;
  mainImage: string;
  name: string;
  maxLearners: number;
  category: string;
  lastTime: string;
  active: boolean;
  createdOn: string;
}

const initialRows: ClassData[] = [
  {
    id: 1,
    mainImage: '/images/class1.jpg',
    name: 'Pinlearn Team',
    maxLearners: 3,
    category: 'Dance',
    lastTime: 'Oct 7, 2024',
    active: true,
    createdOn: 'Mar 26, 2024',
  },
  {
    id: 2,
    mainImage: '/images/class2.jpg',
    name: 'New group class',
    maxLearners: 2,
    category: 'Management',
    lastTime: 'Mar 30, 2024',
    active: true,
    createdOn: 'Mar 26, 2024',
  },
];
import { useNavigate } from "react-router-dom";

const Groupclasses: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState<ClassData>({
    id: rows.length + 1,
    mainImage: "",
    name: "",
    maxLearners: 0,
    category: "",
    lastTime: "",
    active: false,
    createdOn: new Date().toLocaleDateString(),
  });

  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewClass({
      id: rows.length + 1,
      mainImage: "",
      name: "",
      maxLearners: 0,
      category: "",
      lastTime: "",
      active: false,
      createdOn: new Date().toLocaleDateString(),
    });
  };

  const handleAddClass = () => {
    setRows([...rows, newClass]);
    handleModalClose();
  };

  const handleEditClass = (id: number) => {
    navigate(`update/${id}`); // Redirect to the update route with the class ID
  };

  const handleDeleteClass = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };


  return (
    <div className=" mt-16 ml-12">
      <Box sx={{ padding: '' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Group Classes
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ width: '300px' }}
          />
<Button
  variant="contained"
  // color="secondary"
  startIcon={<AddCircleOutlineIcon />}
  onClick={() => navigate('add')} // Path matches the route
>
  Add
</Button>


        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Main Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Maximum Learners</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Last Time</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Avatar src={row.mainImage} alt="Class Image" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.maxLearners}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.lastTime}</TableCell>
                  <TableCell>
                    {row.active ? (
                      <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✔</span>
                    ) : (
                      <span style={{ color: '#f44336', fontWeight: 'bold' }}>✘</span>
                    )}
                  </TableCell>
                  <TableCell>{row.createdOn}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClass(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClass(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Class Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={isModalOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Add New Class
              </Typography>
              <TextField
                label="Class Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={newClass.name}
                onChange={(e) =>
                  setNewClass({ ...newClass, name: e.target.value })
                }
              />
              <TextField
                label="Maximum Learners"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={newClass.maxLearners}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    maxLearners: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={newClass.category}
                onChange={(e) =>
                  setNewClass({ ...newClass, category: e.target.value })
                }
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleModalClose}
                  sx={{ marginRight: 1 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAddClass}>
                  Add
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Outlet /> {/* This renders nested routes */}

    </div>
  );
};

export default Groupclasses;
