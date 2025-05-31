import "./style.css";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper
} from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from "@mui/icons-material/Edit";
import { useUserTransactions } from "../../../services/transactions/transactions.queries";

function MyTransaction() {
  const { data, isLoading, isError } = useUserTransactions();

  if (isLoading) return <div className="ml-16 mt-16">Loading...</div>;
  if (isError) return <div className="ml-16 mt-16">Failed to load transactions.</div>;

  return (
    <main className="mt-16 ml-16">
      {/* Filters */}
      <div className="second-column grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-11">
        <input className='searching sm:my-4' placeholder='Enroll Type' style={{ width: "90%" }} />
        <input className='searching sm:my-4' placeholder='Status' style={{ width: "90%" }} />
        <input className='searching sm:my-4' placeholder='Enter Code' style={{ width: "90%" }} />
        <button className="bg-red-500 text-white font-bold hover:bg-blue-400 duration-200 sm:my-4">Filter</button>
      </div>

      {/* Table */}
      <div className="third-column">
        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <Table aria-label="simple table" stickyHeader className="my-table-shadow">
            <TableHead>
              <TableRow>
                <TableCell><div className="font-extrabold">Sender</div></TableCell>
                <TableCell><div className="font-extrabold">Receiver</div></TableCell>
                <TableCell><div className="font-extrabold">Amount</div></TableCell>
                <TableCell><div className="font-extrabold">Type</div></TableCell>
                <TableCell><div className="font-extrabold">Note</div></TableCell>
                <TableCell><div className="font-extrabold">Created At</div></TableCell>
                <TableCell><div className="font-extrabold">Action</div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-extrabold text-blue-500">{row.sender?.username}</TableCell>
                  <TableCell className="font-extrabold">{row.receiver?.username}</TableCell>
                  <TableCell className="font-extrabold">${row.amount}</TableCell>
                  <TableCell className="font-extrabold">
                    <div className="bg-green-500 text-white text-center text-xs rounded-xl p-2">{row.type}</div>
                  </TableCell>
                  <TableCell className="font-extrabold">{row.note}</TableCell>
                  <TableCell className="font-extrabold">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-extrabold">
                    <div className="flex gap-2">
                      <PreviewIcon className="hover:text-blue-500 cursor-pointer" />
                      <EditIcon className="hover:text-red-500 cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}

export default MyTransaction;
