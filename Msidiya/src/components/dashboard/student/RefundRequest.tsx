import "./style.css";
import * as React from 'react';
import { TableContainer, Table , TableHead,TableBody , TableRow ,TableCell , Paper} from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';


function RefundRequest () {
    return (
        <main className=" mt-16 ml-16 ">
            <div className="second-column grid  my-11" >
                 <input className='searching sm:my-4' placeholder='Search here' style={{width:"95%"}}></input>
                 
             </div> 
             <div className="third-column">
                <TableContainer component={Paper} sx={{maxHeight:"400px"}} >
                    <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                        <TableHead>
                            <TableRow >
                                <TableCell><div className="font-extrabold ">Tutor Name</div></TableCell>
                                <TableCell><div className="font-extrabold ">Subject</div></TableCell>
                                <TableCell><div className="font-extrabold ">Groupe Class</div></TableCell>
                                <TableCell><div className="font-extrabold ">Course</div></TableCell>
                                <TableCell><div className="font-extrabold ">Amount</div></TableCell>
                                <TableCell><div className="font-extrabold ">Reason</div></TableCell>
                                <TableCell><div className="font-extrabold ">Created On</div></TableCell>
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
                                         <TableCell className="font-extrabold" >{row.Course}</TableCell>
                                         <TableCell className="font-extrabold" align="center">{row.Amount}</TableCell>
                                         <TableCell className="font-extrabold" align="center"><div >{row.Reason}</div></TableCell>
                                         <TableCell className="font-extrabold" ><div className="text-xs text-white font-bold bg-green-400 rounded-md text-center p-2 ">{row.Status}</div></TableCell>  
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


export default RefundRequest;

const tableData = [
    {
      "Tutor Name": "Tutor A",
      "Subject": "Physics",
      "Groupe Class": "Maths",
      "Course": "Calculus Basics",
      "Amount": "25$",
      "Reason": "Student Request",
      "Status": "completed",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor B",
      "Subject": "Biology",
      "Groupe Class": "Science",
      "Course": "Human Anatomy",
      "Amount": "18$",
      "Reason": "No Show",
      "Status": "pending",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor C",
      "Subject": "English",
      "Groupe Class": "Literature",
      "Course": "Shakespearean Plays",
      "Amount": "30$",
      "Reason": "Technical Issues",
      "Status": "refunded",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor D",
      "Subject": "History",
      "Groupe Class": "Humanities",
      "Course": "World War II",
      "Amount": "22$",
      "Reason": "Class Cancelled",
      "Status": "rescheduled",
      "action": <PreviewIcon/>
    },
    {
      "Tutor Name": "Tutor E",
      "Subject": "Mathematics",
      "Groupe Class": "Algebra",
      "Course": "Linear Equations",
      "Amount": "20$",
      "Reason": "Personal Request",
      "Status": "completed",
      "action": <PreviewIcon/>
    }
];
