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
import {
  useTutorEarnings,
  usePayoutHistory,
  useRequestPayout,
  useAddBankAccount,
} from "../../../services/payout/payoutQueries";

const PayoutComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  console.log(dateRange);

  const { data: tutorEarnings, isLoading: statsLoading } = useTutorEarnings();
  const { data: payoutHistory, isLoading: historyLoading } = usePayoutHistory();
  const requestPayout = useRequestPayout();
  const addBankAccount = useAddBankAccount();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setActiveTab(newValue);
  };

  const totalRevenue = parseFloat(tutorEarnings?.total_revenue || "0");
  const tutorBalance = parseFloat(tutorEarnings?.total_earnings || "0");
  const commission = totalRevenue - tutorBalance;

  // Prepare pie chart data
  const pieData = {
    labels: ["Commission", "Balance", "Total"],
    datasets: [
      {
        data: [commission, tutorBalance, totalRevenue],
        backgroundColor: ["#27D4EE", "#49C7B4", "#635BFF"],
        hoverBackgroundColor: ["#27D4EE", "#49C7B4", "#635BFF"],
      },
    ],
  };

  const handleRequestPayout = () => {
    requestPayout.mutate(tutorBalance || 0);
  };

  const handleAddBankAccount = () => {
    // You might want to add a modal or form for bank details
    addBankAccount.mutate({
      accountNumber: "",
      bankName: "",
      routingNumber: "",
    });
  };

  if (statsLoading || historyLoading) {
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

  return (
    <div className="ml-16 mt-16">
      <Box sx={{ p: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Earnings Status" />
          <Tab label="Request Manager Account" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Pie data={pieData} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Total Earnings</Typography>
                  <Typography variant="body1">${totalRevenue || 0}</Typography>
                  <Typography variant="h6">Commission to the site</Typography>
                  <Typography variant="body1">${commission || 0}</Typography>
                  <Typography variant="h6">Tutor Earnings</Typography>
                  <Typography variant="body1">${tutorBalance || 0}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
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
                  {payoutHistory?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>${row.amount}</TableCell>
                      <TableCell>${row.commission}</TableCell>
                      <TableCell>${row.balance}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              row.status === "Pending"
                                ? "orange"
                                : row.status === "Rejected"
                                ? "red"
                                : "green",
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

        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              // You might want to add a date range picker here
              setDateRange({ startDate: "2024-01-01", endDate: "2024-12-31" });
            }}
          >
            Stats By Date Range
          </Button>
          <Button
            variant="outlined"
            onClick={handleRequestPayout}
            disabled={requestPayout.isPending}
          >
            {requestPayout.isPending ? "Sending Request..." : "Send Request"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleAddBankAccount}
            disabled={addBankAccount.isPending}
          >
            {addBankAccount.isPending
              ? "Adding Account..."
              : "Add a Bank Account"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PayoutComponent;
