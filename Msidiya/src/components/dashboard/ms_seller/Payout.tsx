import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { useSellerEarnings } from "../../../services/payout/payoutQueries";

const PayoutComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: sellerEarnings, isLoading } = useSellerEarnings();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setActiveTab(newValue);
  };

  const enrollData = sellerEarnings?.data.find(
    (item) => item.type === "enroll"
  );
  const receiveData = sellerEarnings?.data.find(
    (item) => item.type === "receive"
  );
  const sendData = sellerEarnings?.data.find((item) => item.type === "send");

  // Sample data for the pie chart
  const pieData = {
    labels: ["Enroll", "Receive", "Send"],
    datasets: [
      {
        data: [
          parseFloat(enrollData?.total_amount || "0"),
          parseFloat(receiveData?.total_amount || "0"),
          parseFloat(sendData?.total_amount || "0"),
        ],
        backgroundColor: ["#27D4EE", "#49C7B4", "#635BFF"],
        hoverBackgroundColor: ["#27D4EE", "#49C7B4", "#635BFF"],
      },
    ],
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // Sample data for the table
  const tableData =
    sellerEarnings?.data.map((item) => ({
      type: item.type,
      count: item.count,
      total_amount: item.total_amount,
    })) || [];

  return (
    <div className="ml-16 mt-16">
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
                  <Typography variant="h6">Enroll</Typography>
                  <Typography variant="body1">
                    ${enrollData?.total_amount || "0.00"}
                  </Typography>
                  <Typography variant="h6">Receive</Typography>
                  <Typography variant="body1">
                    ${receiveData?.total_amount || "0.00"}
                  </Typography>
                  <Typography variant="h6">Send</Typography>
                  <Typography variant="body1">
                    ${sendData?.total_amount || "0.00"}
                  </Typography>
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
                    <TableCell>Type</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>${row.total_amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Bottom Controls */}
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
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
