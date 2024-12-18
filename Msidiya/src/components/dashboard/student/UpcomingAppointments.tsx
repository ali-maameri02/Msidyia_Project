import "./style.css";
import * as React from 'react';
import { TableContainer, Table , TableHead,TableBody , TableRow ,TableCell , Paper} from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const UpcomingAppointments: React.FC = () => {
    const [viewDataVisible , setViewDataVisible] = React.useState(false);
    const [viewDataVisible1 , setViewDataVisible1] = React.useState(false);
     

    const handleViewDataClick =()=>{
        setViewDataVisible(false);
        setViewDataVisible1(true);
    }
    const handleViewDataClick1 =()=>{
        setViewDataVisible1(false);
        setViewDataVisible(true);
    }
    
    const [popUp , setPopUp] = React.useState(false);
    const popUpCard =()=> {
       setPopUp(!popUp);
    }
  return(
    <main className=" mt-16 ml-16 ">
      
        <div className="grid grid-cols-1  gap-y-6">
             <div className="first-column border-b-2">
               <button className='btn' onClick={handleViewDataClick1}>One on One Classes</button>
               <button className='btn' onClick={handleViewDataClick}>Groupe Classes</button>
            </div>  
             <div className="second-column">
                <select name="days" id="days" className='feild-form'>
                    <option value="All Days">All Days</option>
                    <option value="today">Today</option>
                    <option value="this week">This week</option>
                 </select>
                 <input className='searching' placeholder='search : tutor,user,subject,groupclass'></input>
             </div>
             {viewDataVisible &&
             <div className="third-column">
                <TableContainer component={Paper} sx={{maxHeight:"400px"}} >
                    <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                        <TableHead>
                            <TableRow >
                                <TableCell><div className="font-extrabold ">Tutor name</div></TableCell>
                                <TableCell><div className="font-extrabold ">Subject/Group Class</div></TableCell>
                                <TableCell><div className="font-extrabold ">Enroll Type</div></TableCell>
                                <TableCell><div className="font-extrabold ">Lesson Type</div></TableCell>
                                <TableCell><div className="font-extrabold ">Paid</div></TableCell>
                                <TableCell><div className="font-extrabold ">Start Time</div></TableCell>
                                <TableCell><div className="font-extrabold ">To Time</div></TableCell>
                                <TableCell><div className="font-extrabold ">Created On</div></TableCell>
                                <TableCell><div className="font-extrabold ">Status</div></TableCell>
                                <TableCell><div className="font-extrabold ">Action</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableData.map(row =>(
                                    <TableRow key={row["Tutor name"]} 
                                    sx={{ '&:last-child td , &:last-child':{border:0}}}>

                                      <TableCell className="font-extrabold" >{row["Tutor name"]}</TableCell>
                                         <TableCell className="font-extrabold">{row["Subject/Group Class"]}</TableCell>
                                         <TableCell className="font-extrabold"> {row["Enroll Type"]}</TableCell>
                                         <TableCell className="font-extrabold" align="center"><div className="bg-red-400 font-semibold text-red-700 rounded-lg">{row["Lesson Type"]}</div></TableCell>
                                         <TableCell className="font-extrabold" align="center"><div className="bg-green-400 font-semibold text-green-600 rounded-lg p-2">{row.Paid}</div></TableCell>
                                         <TableCell className="font-extrabold">{row["Start Time"]} </TableCell>
                                         <TableCell className="font-extrabold">{row["To Time"]} </TableCell>
                                         <TableCell className="font-extrabold">{row["Created On"]} </TableCell>
                                         <TableCell className="font-extrabold" align="center"><div className="bg-green-400 font-semibold text-green-600 rounded-lg p-2">{row.Status}</div></TableCell>
                                         <TableCell className="font-extrabold" align="center"><div className="cursor-pointer hover:bg-red-500 p-1 transition-all">{row.Action}</div></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
             </div>}
             {/* second column */}
             {viewDataVisible1 &&
             <div className="third-column">
                <TableContainer component={Paper} sx={{maxHeight:"400px"}} >
                    <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                        <TableHead>
                            <TableRow >
                                <TableCell><div className="font-extrabold ">Tutor name</div></TableCell>
                                <TableCell><div className="font-extrabold ">Group Class</div></TableCell>
                                <TableCell><div className="font-extrabold ">Action</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableData1.map(row =>(
                                    <TableRow key={row["Tutor name"]} 
                                    sx={{ '&:last-child td , &:last-child':{border:0}}}>

                                <TableCell className="font-extrabold" >{row["Tutor name"]}</TableCell>
                                <TableCell className="font-extrabold">{row["Subject/Group Class"]}</TableCell>
                                <TableCell className="font-extrabold"><button onClick={popUpCard} className="cursor-pointer bg-green-400 font-semibold text-green-600 rounded-lg p-2 w-30">{row.Action}</button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {popUp &&
                 
                <TableContainer component={Paper} sx={{maxHeight:"400px"}} className="popUp" >
                   <div className="bg-blue-500 p-3"><p className="text-white font-extrabold"> list appointments of Deep Tissue Massage Class <CancelOutlinedIcon onClick={popUpCard} className="ml-10 cursor-pointer hover:bg-green-400 hover:transition-all"/></p></div>
                    <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                        <TableHead>
                            <TableRow >
                                <TableCell><div className="font-extrabold ">Tutor name</div></TableCell>
                                <TableCell><div className="font-extrabold ">Group Class</div></TableCell>
                                <TableCell><div className="font-extrabold ">Action</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableData1.map(row =>(
                                    <TableRow key={row["Tutor name"]} 
                                    sx={{ '&:last-child td , &:last-child':{border:0}}}>

                                <TableCell className="font-extrabold" >{row["Tutor name"]}</TableCell>
                                <TableCell className="font-extrabold">{row["Subject/Group Class"]}</TableCell>
                                <TableCell className="font-extrabold"><button  className="cursor-pointer bg-green-400 font-semibold text-green-600 rounded-lg p-2 w-30">{row.Action}</button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer> } 
             </div>}
        </div>
    </main>
  )
};

export default UpcomingAppointments;

const tableData = [{
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action": <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action":  <PreviewIcon />
  }, {
    "Tutor name": "tutor B",
    "Subject/Group Class": "Hardware",
    "Enroll Type": "Subject",
    "Lesson Type": "Paid Lesson",
    "Paid": "Yes",
    "Start Time": "28/06/2025 , 10.00Am",
    "To Time": "28/06/2025 , 10.00Am",
    "Created On": "28/06/2025 , 10.00Am",
    "Status": "Booked",
    "Action": <PreviewIcon />
  }];
  const tableData1 = [{
    "Tutor name": "imed fetah",
    "Subject/Group Class": "Data science",
    
    "Action":  "View list appointments"
  }, {
    "Tutor name": "ali abdou",
    "Subject/Group Class": "it",
 
    "Action": "View list appointments"
  }, {
    "Tutor name": "imed fetah ",
    "Subject/Group Class": "Data science",
    "Action":  "View list appointments"
  }, {
    "Tutor name": "fetah imed",
    "Subject/Group Class": "Hardware",
    
    "Action":  "View list appointments"
  }, {
    "Tutor name": "maameri djedaiet",
    "Subject/Group Class": "java",
    "Action":  "View list appointments"
  }
];
