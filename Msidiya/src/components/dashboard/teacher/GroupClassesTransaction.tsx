import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import jsPDF from "jspdf";

interface Transaction {
  userName: string;
  courseName: string;
  price: string;
  earnings: string;
  createdOn: string;
}

const data: Transaction[] = [
  { userName: "Minh Student", courseName: "test couysee", price: "$30", earnings: "$27", createdOn: "Feb 28, 2024" },
  { userName: "studentharry", courseName: "Reading 101", price: "$100", earnings: "$90", createdOn: "Jan 9, 2024" },
  { userName: "Priya", courseName: "The Ultimate Guide To Understanding Algebra Master The Fundamentals of Algebra", price: "$40", earnings: "$36", createdOn: "Aug 30, 2023" },
  { userName: "Priya", courseName: "Reading 101", price: "$100", earnings: "$90", createdOn: "Aug 25, 2023" },
  { userName: "Priya", courseName: "New Course Test", price: "$21", earnings: "$18.9", createdOn: "Mar 1, 2023" },
  { userName: "Thai Vu", courseName: "New Course Test", price: "$21", earnings: "$0", createdOn: "Sep 8, 2022" },
  { userName: "Tutor Mary Mary", courseName: "new cpurse", price: "$0", earnings: "$0", createdOn: "Aug 18, 2022" },
  { userName: "ZYX", courseName: "environ", price: "$50", earnings: "$40", createdOn: "Apr 7, 2022" },
];

const GroupClassesTransaction: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDownload = () => {
    if (selectedTransaction) {
      const doc = new jsPDF();
      doc.text("Transaction Details", 10, 10);
      doc.text(`User Name: ${selectedTransaction.userName}`, 10, 20);
      doc.text(`Course Name: ${selectedTransaction.courseName}`, 10, 30);
      doc.text(`Price: ${selectedTransaction.price}`, 10, 40);
      doc.text(`Earnings: ${selectedTransaction.earnings}`, 10, 50);
      doc.text(`Created On: ${selectedTransaction.createdOn}`, 10, 60);
      doc.save("transaction.pdf");
    }
  };

  const filteredData = data.filter((row) =>
    row.courseName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="ml-16 mt-16">
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Group Classes Transaction
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search course name"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Earnings</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>
                    {row.courseName.length > 30
                      ? `${row.courseName.slice(0, 30)}...`
                      : row.courseName}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.earnings}</TableCell>
                  <TableCell>{row.createdOn}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewTransaction(row)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          {selectedTransaction && (
            <Box>
              <Typography variant="h6">Transaction Details</Typography>
              <Typography>User Name: {selectedTransaction.userName}</Typography>
              <Typography>Course Name: {selectedTransaction.courseName}</Typography>
              <Typography>Price: {selectedTransaction.price}</Typography>
              <Typography>Earnings: {selectedTransaction.earnings}</Typography>
              <Typography>Created On: {selectedTransaction.createdOn}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} color="primary" variant="contained">
            Download
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default GroupClassesTransaction;
