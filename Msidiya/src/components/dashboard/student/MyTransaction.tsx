import "./style.css";
import * as React from 'react';
import { TableContainer, Table , TableHead,TableBody , TableRow ,TableCell , Paper} from "@mui/material";
import { Margin } from "@mui/icons-material";
import PreviewIcon from '@mui/icons-material/Preview';



function MyTransaction () {
    return (
        <main className="flex flex-col   mt-20 bg-transparent main  ">
            <div className="second-column grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-11" >
                 <input className='searching sm:my-4' placeholder='Enroll Type' style={{width:"90%"}}></input>
                 <input className='searching sm:my-4' placeholder='Status' style={{width:"90%"}}></input>
                 <input className='searching sm:my-4' placeholder='Enter Code' style={{width:"90%"}}></input>
                 <button className="bg-red-500 text-white font-bold hover:bg-blue-400 duration-200 sm:my-4">Filter</button>
             </div> 

             {/* column section */}
             <div className="third-column">
                <TableContainer component={Paper} sx={{maxHeight:"400px"}} >
                    <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                        <TableHead>
                            <TableRow >
                                <TableCell><div className="font-extrabold ">Tutor Name</div></TableCell>
                                <TableCell><div className="font-extrabold ">Subject</div></TableCell>
                                <TableCell><div className="font-extrabold ">Groupe Class</div></TableCell>
                                <TableCell><div className="font-extrabold ">Type</div></TableCell>
                                <TableCell><div className="font-extrabold ">Enroll Type</div></TableCell>
                                <TableCell><div className="font-extrabold ">Code</div></TableCell>
                                <TableCell><div className="font-extrabold ">Price</div></TableCell>
                                <TableCell><div className="font-extrabold ">Created On</div></TableCell>
                                <TableCell><div className="font-extrabold ">Status</div></TableCell>
                                <TableCell><div className="font-extrabold ">Action</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableData.map(row =>(
                                    <TableRow key={row["Tutor Name"]} 
                                    sx={{ '&:last-child td , &:last-child':{border:0}}}>

                                         <TableCell className="font-extrabold" ><div className="text-blue-500 font-extrabold">{row["Tutor Name"]}</div></TableCell>
                                         <TableCell className="font-extrabold"><div  >{row.Subject}</div></TableCell>
                                         <TableCell className="font-extrabold"> {row["Groupe Class"]}</TableCell>
                                         <TableCell className="font-extrabold" ><div className="bg-green-500 text-center text-white font-bold text-xs rounded-xl p-2">{row.Type}</div></TableCell>
                                         <TableCell className="font-extrabold" align="center"><div className="bg-purple-600 rounded-xl text-xs text-white p-2 font-bold" >{row["Enroll Type"]}</div></TableCell>
                                         <TableCell className="font-extrabold" align="center"><div >{row.code}</div></TableCell>
                                         <TableCell className="font-extrabold" ><div>{row.Price}</div></TableCell>
                                         <TableCell className="font-extrabold" ><div>{row["Created On"]}</div></TableCell>
                                         <TableCell className="font-extrabold" ><div className="text-sm text-white bg-green-500 p-2 rounded-xl">{row.Status}</div></TableCell>
                                         <TableCell className="font-extrabold" ><div className="hover:bg-red-400 hover:duration-200 text-center p-2 hover:cursor-pointer">{row.action}</div></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
             </div>
        </main>
    )
}

export default MyTransaction;


const tableData = [
    {
      "Tutor Name": "Tutor F",
      "Subject": "Chemistry",
      "Groupe Class": "Science",
      "Type": "Booking",
      "Enroll Type": "Group",
      "code": "chem789",
      "Price": "$30",
      "Created On": "Sep 5, 2024",
      "Status": "Payment Completed / Booked",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor G",
      "Subject": "Biology",
      "Groupe Class": "Science",
      "Type": "Booking",
      "Enroll Type": "One to one",
      "code": "bio456",
      "Price": "$22",
      "Created On": "Sep 10, 2024",
      "Status": "Payment Pending",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor H",
      "Subject": "History",
      "Groupe Class": "Humanities",
      "Type": "Booking",
      "Enroll Type": "Group",
      "code": "hist123",
      "Price": "$18",
      "Created On": "Sep 12, 2024",
      "Status": "Cancelled",
      "action":<PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor I",
      "Subject": "Physics",
      "Groupe Class": "Science",
      "Type": "Booking",
      "Enroll Type": "One to one",
      "code": "phys987",
      "Price": "$25",
      "Created On": "Sep 18, 2024",
      "Status": "Payment Completed / Booked",
      "action": <PreviewIcon/>
    }
];

