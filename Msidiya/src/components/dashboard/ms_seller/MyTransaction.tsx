import "./style.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useUserTransactions } from "../../../services/transactions/transactions.queries";

function MyTransaction() {
  const { data: transactions, isLoading, isError } = useUserTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching transactions</div>;
  }

  return (
    <main className=" mt-16 ml-16 ">
      <div className="second-column grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-11">
        <input
          className="searching sm:my-4"
          placeholder="Enroll Type"
          style={{ width: "90%" }}
        ></input>
        <input
          className="searching sm:my-4"
          placeholder="Status"
          style={{ width: "90%" }}
        ></input>
        <input
          className="searching sm:my-4"
          placeholder="Enter Code"
          style={{ width: "90%" }}
        ></input>
        <button className="bg-red-500 text-white font-bold hover:bg-blue-400 duration-200 sm:my-4">
          Filter
        </button>
      </div>

      {/* column section */}
      <div className="third-column">
        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <Table
            aria-label="simple table"
            stickyHeader
            className="my-table-shadow"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className="font-extrabold ">Sender</div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold ">Receiver</div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold ">Amount</div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold ">Type</div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold ">Date</div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold ">Note</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td , &:last-child": { border: 0 } }}
                >
                  <TableCell className="font-extrabold">
                    <div className="text-blue-500 font-extrabold">
                      {row.sender ?? "N/A"}
                    </div>
                  </TableCell>
                  <TableCell className="font-extrabold">
                    {row.receiver ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-extrabold">
                    {" "}
                    {row.amount}
                  </TableCell>
                  <TableCell className="font-extrabold">
                    <div className="bg-green-500 text-center text-white font-bold text-xs rounded-xl p-2">
                      {row.type}
                    </div>
                  </TableCell>
                  <TableCell className="font-extrabold">
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-extrabold">{row.note}</TableCell>
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
