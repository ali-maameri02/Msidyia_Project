import * as React from 'react';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import {
  Paper,
  IconButton,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Define interfaces for row data
interface Subject {
  id: number;
  name: string;
  topics: string[];
}

interface CategoryRow {
  [x: string]: any;
  id: number;
  categoryName: string;
  activeStatus: boolean;
  subjects?: Subject[];
}

// Define the columns for the DataGrid
const columns: GridColDef<CategoryRow>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'categoryName', headerName: 'Category Name', width: 200 },
  {
    field: 'activeStatus',
    headerName: 'Active Status',
    width: 150,
    renderCell: (params) =>
      params.value ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>Active</span>
      ) : (
        <span style={{ color: 'red', fontWeight: 'bold' }}>Inactive</span>
      ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton
          color="primary"
          title="List Subjects"
          onClick={() => params.row.onListSubjects?.(params.row)}
        >
          <ListIcon />
        </IconButton>
        <IconButton color="secondary" title="Modify">
          <EditIcon />
        </IconButton>
        <IconButton color="error" title="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

// Rows data
const rows: CategoryRow[] = [
  {
    id: 1,
    categoryName: 'Mathematics',
    activeStatus: true,
    subjects: [
      { id: 1, name: 'Algebra', topics: ['Equations', 'Inequalities'] },
      { id: 2, name: 'Geometry', topics: ['Shapes', 'Angles'] },
    ],
  },
  {
    id: 2,
    categoryName: 'Science',
    activeStatus: true,
    subjects: [
      { id: 1, name: 'Physics', topics: ['Forces', 'Motion'] },
      { id: 2, name: 'Chemistry', topics: ['Atoms', 'Reactions'] },
    ],
  },
];

export default function Setcategories() {
  const [open, setOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [isAddingSubject, setIsAddingSubject] = React.useState(false);
  const [newValue, setNewValue] = React.useState('');
  const [selectedSubjects, setSelectedSubjects] = React.useState<Subject[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(
    null
  );
  const [openAddCategoryModal, setOpenAddCategoryModal] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState('');
  const [categories, setCategories] = React.useState<string[]>([]);

  const handleOpen = (row: CategoryRow) => {
    setSelectedSubjects(row.subjects || []);
    setSelectedTopics([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubjects([]);
    setSelectedTopics([]);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedTopics(subject.topics);
  };

  const handleAddModalOpen = (isSubject: boolean) => {
    setIsAddingSubject(isSubject);
    setAddModalOpen(true);
    setNewValue('');
  };

  const handleAdd = () => {
    if (newValue.trim()) {
      if (isAddingSubject) {
        setSelectedSubjects([
          ...selectedSubjects,
          { id: Date.now(), name: newValue.trim(), topics: [] },
        ]);
      } else if (selectedSubject) {
        const updatedSubjects = selectedSubjects.map((subject) =>
          subject.id === selectedSubject.id
            ? { ...subject, topics: [...subject.topics, newValue.trim()] }
            : subject
        );
        setSelectedSubjects(updatedSubjects);
        setSelectedTopics([...selectedTopics, newValue.trim()]);
      }
    }
    setAddModalOpen(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory('');
      setOpenAddCategoryModal(false);
    }
  };

  return (
    <div className="ml-16 mt-16">
      <div className="buttons flex flex-row justify-end px-16 pb-5">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddCategoryModal(true)}
        >
          ADD CATEGORY
        </Button>
      </div>
      <Paper sx={{ height: 400, width: '95%' }}>
        <DataGrid
          rows={rows.map((row) => ({
            ...row,
            onListSubjects: handleOpen,
          }))}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <div className="flex space-x-6">
            {/* Subjects Table */}
            <TableContainer component={Paper} sx={{ flex: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Subjects
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddModalOpen(true)}
                      >
                        Add Subject
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedSubjects.map((subject) => (
                    <TableRow
                      key={subject.id}
                      hover
                      selected={subject.id === selectedSubject?.id}
                      onClick={() => handleSubjectClick(subject)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{subject.name}</TableCell>
                      <TableCell align="right">
                        <IconButton color="secondary" title="Modify">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" title="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Topics Table */}
            <TableContainer component={Paper} sx={{ flex: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Topics
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddModalOpen(false)}
                      >
                        Add Topic
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTopics.map((topic, index) => (
                    <TableRow key={index}>
                      <TableCell>{topic}</TableCell>
                      <TableCell align="right">
                        <IconButton color="secondary" title="Modify">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" title="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Subject/Topic Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
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
            borderRadius: '10px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add {isAddingSubject ? 'Subject' : 'Topic'}
          </Typography>
          <TextField
            label={`New ${isAddingSubject ? 'Subject' : 'Topic'} Name`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
          />
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        open={openAddCategoryModal}
        onClose={() => setOpenAddCategoryModal(false)}
      >
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
            borderRadius: '10px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Category
          </Typography>
          <TextField
            label="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
          <div className="flex justify-end mt-4 space-x-4">
            <Button
              variant="outlined"
              onClick={() => setOpenAddCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
