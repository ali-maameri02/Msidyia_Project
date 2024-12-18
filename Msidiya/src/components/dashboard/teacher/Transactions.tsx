import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

interface CourseTransactionProps {
  transactions: {
    userName: string;
    courseName: string;
    price: string;
    earnings: string;
    createdOn: string;
  }[];
}

const Transactions: React.FC<CourseTransactionProps> = ({ transactions }) => {
  // Function to handle CSV download
  const handleDownloadCSV = () => {
    const csvHeader = "User name,Group-Class name,Price,Earnings,Created On\n";
    const csvRows = transactions
      .map(
        (transaction) =>
          `${transaction.userName},${transaction.courseName},${transaction.price},${transaction.earnings},${transaction.createdOn}`
      )
      .join("\n");
    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 ml-16 mt-16">
      {/* Search Bar */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search Group-Class name"
        className="w-56 mb-8"
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-4">
        <Button
          variant="outlined"
          startIcon={<PrintOutlinedIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleDownloadCSV}
        >
          Download CSV
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md mt-10">
        <Table>
          {/* Table Header */}
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">User name</TableCell>
              <TableCell className="font-bold">Group-Class name</TableCell>
              <TableCell className="font-bold">Price</TableCell>
              <TableCell className="font-bold">Earnings</TableCell>
              <TableCell className="font-bold">Created On</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.userName}</TableCell>
                <TableCell>{transaction.courseName}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>{transaction.earnings}</TableCell>
                <TableCell>{transaction.createdOn}</TableCell>
                <TableCell>
                  <IconButton>
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transactions;
