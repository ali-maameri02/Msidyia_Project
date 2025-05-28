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
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import jsPDF from "jspdf";
import { IGroupClassTransaction } from "../../../interfaces/IGroupClassTransaction";
import { useGroupClassTransactions } from "../../../services/transactions/transactions.queries";

const GroupClassesTransaction: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTransaction, setSelectedTransaction] = React.useState<IGroupClassTransaction | null>(null);
  const [openModal, setOpenModal] = React.useState(false);

  // Use the query hook with search term
  const { data: transactions, isLoading, error, isError } = useGroupClassTransactions(searchTerm || undefined);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewTransaction = (transaction: IGroupClassTransaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  const handleDownload = () => {
    if (selectedTransaction) {
      const doc = new jsPDF();
      doc.text("Transaction Details", 10, 10);
      doc.text(`User Name: ${selectedTransaction.user_name}`, 10, 20);
      doc.text(`Course Name: ${selectedTransaction.course_name}`, 10, 30);
      doc.text(`Price: $${selectedTransaction.price}`, 10, 40);
      doc.text(`Earnings: $${selectedTransaction.earnings}`, 10, 50);
      doc.text(`Created On: ${selectedTransaction.created_on}`, 10, 60);
      doc.save("transaction.pdf");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="ml-16 mt-16">
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="ml-16 mt-16">
        <Box sx={{ padding: 2 }}>
          <Alert severity="error">
            {error?.message || "Failed to load transactions. Please try again."}
          </Alert>
        </Box>
      </div>
    );
  }

  // No data state
  const transactionData = transactions || [];

  return (
    <div className="ml-16 mt-16">
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Group Classes Transaction
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search course name or student name"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
            }}
          />
        </Box>

        {transactionData.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="body1" color="textSecondary">
              {searchTerm ? "No transactions found for your search." : "No transactions available."}
            </Typography>
          </Box>
        ) : (
          <>
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
                  {transactionData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.user_name}</TableCell>
                        <TableCell>
                          {row.course_name.length > 30
                            ? `${row.course_name.slice(0, 30)}...`
                            : row.course_name}
                        </TableCell>
                        <TableCell>${row.price}</TableCell>
                        <TableCell>${row.earnings}</TableCell>
                        <TableCell>{row.created_on}</TableCell>
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
              count={transactionData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {/* Modal */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent>
            {selectedTransaction && (
              <Box>
                <Typography variant="h6" gutterBottom>Transaction Details</Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>User Name:</strong> {selectedTransaction.user_name}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Course Name:</strong> {selectedTransaction.course_name}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Price:</strong> ${selectedTransaction.price}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Earnings:</strong> ${selectedTransaction.earnings}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Created On:</strong> {selectedTransaction.created_on}
                </Typography>
                {selectedTransaction.note && (
                  <Typography sx={{ mb: 1 }}>
                    <strong>Note:</strong> {selectedTransaction.note}
                  </Typography>
                )}
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
