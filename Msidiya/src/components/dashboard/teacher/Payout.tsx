import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';

const PayoutComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setActiveTab(newValue);
  };

  // Sample data for the pie chart
  const pieData = {
    labels: ['Commission', 'Balance', 'Total'],
    datasets: [
      {
        data: [20, 50, 30],
        backgroundColor: ['#27D4EE', '#49C7B4', '#635BFF'],
        hoverBackgroundColor: ['#27D4EE', '#49C7B4', '#635BFF'],
      },
    ],
  };

  // Sample data for the table
  const tableData = [
    { date: 'Mar 14, 2024', amount: '$338', commission: '$33.8', balance: '$304.2', status: 'Pending' },
    { date: 'Mar 16, 2023', amount: '$98', commission: '$9.8', balance: '$88.2', status: 'Rejected' },
    { date: 'Aug 26, 2022', amount: '$132', commission: '$26.4', balance: '$105.6', status: 'Approved' },
    { date: 'Apr 4, 2022', amount: '$1,226', commission: '$261.4', balance: '$964.6', status: 'Approved' },
  ];

  return (
    <div className='ml-16 mt-16'>
      <Box sx={{ p: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Earnings Status" />
          <Tab label="Request Manager Account" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            {/* Statistics Section */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Pie data={pieData} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Total Earnings</Typography>
                  <Typography variant="body1">$268</Typography>
                  <Typography variant="h6">Commission to the site</Typography>
                  <Typography variant="body1">$26.8</Typography>
                  <Typography variant="h6">Tutor Earnings</Typography>
                  <Typography variant="body1">$241.2</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {/* Table Section */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Commission</TableCell>
                    <TableCell>Tutor Balance</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.commission}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              row.status === 'Pending'
                                ? 'orange'
                                : row.status === 'Rejected'
                                  ? 'red'
                                  : 'green',
                          }}
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Bottom Controls */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained">Stats By Date Range</Button>
          <Button variant="outlined">Send Request</Button>
          <Button variant="contained" color="error">
            Add a Bank Account
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PayoutComponent;
