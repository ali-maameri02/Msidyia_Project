import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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

const rows: ClassData[] = [
  {
    id: 1,
    mainImage: '/images/class1.jpg',
    name: 'Pinlearn Team',
    maxLearners: 3,
    category: 'Dance',
    lastTime: 'Apr 3, 2024',
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
  // Add more rows as needed...
];

const columns: GridColDef[] = [
  {
    field: 'mainImage',
    headerName: 'Main Image',
    width: 100,
    renderCell: (params) => (
      <Avatar src={params.value as string} alt="Class Image" />
    ),
  },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'maxLearners', headerName: 'Maximum Learners', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'lastTime', headerName: 'Last Time', width: 150 },
  {
    field: 'active',
    headerName: 'Active',
    width: 100,
    renderCell: (params) => (
      params.value ? <span style={{ color: 'green' }}>✔</span> : <span>✘</span>
    ),
  },
  { field: 'createdOn', headerName: 'Created On', width: 150 },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => (
      <Button startIcon={<EditIcon />} variant="outlined" size="small">
        Edit
      </Button>
    ),
  },
];

const Groupclasses: React.FC = () => {
  return (
    <div  className='p-5  mt-16 flex-col flex '>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }} className='px-16 pr-0 w-[60rem]'>
        <input type="text" placeholder="Search" style={{ padding: '8px', width: '200px' }} />
        <Button variant="contained" startIcon={<AddIcon />} color="primary">
          Add
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Groupclasses;
