import "./style.css";
import * as React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';




function MyCourses() {

  const [viewDataVisible, setViewDataVisible] = React.useState(true);
  const [viewDataVisible1, setViewDataVisible1] = React.useState(false);

  // const [value, setValue] = React.useState<number | null>(2);


  const handleViewDataClick = () => {
    setViewDataVisible(false);
    setViewDataVisible1(true);
  }
  // const handleViewDataClick1 = () => {
  //   setViewDataVisible1(false);
  //   setViewDataVisible(true);
  // }

  return (
    <main className=" mt-16 ml-16 ">
      {viewDataVisible &&
        <div className="grid grid-cols-1  gap-y-6">
          <div className="second-column">
            <input className='searching' placeholder='none'></input>
            <input className='searching' placeholder='Search here'></input>
          </div>
          <div className="third-column">
            <TableContainer component={Paper} sx={{ maxHeight: "400px" }} >
              <Table aria-label="simple table" stickyHeader className="my-table-shadow">
                <TableHead>
                  <TableRow >
                    <TableCell><div className="font-extrabold ">Couse Name</div></TableCell>
                    <TableCell><div className="font-extrabold ">Paid/Free</div></TableCell>
                    <TableCell><div className="font-extrabold ">Categories</div></TableCell>
                    <TableCell><div className="font-extrabold ">Created On</div></TableCell>
                    <TableCell><div className="font-extrabold ">Progress</div></TableCell>
                    <TableCell><div className="font-extrabold ">Action</div></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tableData.map(row => (
                      <TableRow key={row["Course Name"]}
                        sx={{ '&:last-child td , &:last-child': { border: 0 } }}>

                        <TableCell className="font-extrabold" ><div className="text-blue-500 font-extrabold">{row["Course Name"]}</div></TableCell>
                        <TableCell className="font-extrabold"><div className="bg-green-500 text-center text-white font-bold p-2 rounded-xl">{row["Paid/Free"]}</div></TableCell>
                        <TableCell className="font-extrabold"> {row.Categories}</TableCell>
                        <TableCell className="font-extrabold" ><div>{row["Created On"]}</div></TableCell>
                        <TableCell className="font-extrabold" align="center"><div className="bg-green-500 rounded-xl p-2" >{row.Progress}</div></TableCell>
                        <TableCell onClick={handleViewDataClick} className="font-extrabold" align="center"><div className="cursor-pointer hover:bg-red-500 p-1 transition-all">{row.Action}</div></TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      }
      {/* showing course content */}
      {viewDataVisible1 &&
        <div className="view-course-content-container p-5">
          <p className="main-course-title text-4xl text-blue-500 font-bold ">Main course Title</p>
          <div className="grid  lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-1 gap-8 grid-flow-row-dense">
            <div className="lg:col-span-2 bg-blue-500 rounded-xl grid" >
              <div>
                <p className="video-title text-center text-2xl font-bold text-white">Introduction Video</p>
              </div>
              <div className="video-container">

              </div>
            </div>
            <div className="bg-blue-500 align-middle grid row-span-2 content-detail " >
              <div className="the-progress-container">
                <div className="rounded-xl">
                  <p className="text-white text-xl font-bold text-center p-2 bg-blue-500">Progress</p>
                  <div className="bg-white progress-bar-container"><div className="progress-bar"><div className="inner-progress"><p className="text-center text-white font-bold">80%</p></div></div></div>
                </div>
                <div className="bg-red-200 ">dfdf</div>
              </div>
            </div>
          </div>
          <div className="review-section grid my-10 rounded-lg ">
            <div className="review-section">
              <p className="bg-blue-500 text-white font-bold text-xl text-center">Tuor's Rating & Review</p>
              <div className="p-10 bg-blue-300 ">
                <div className="bg-gray-300 course-cards-review-container rounded-3xl">
                  <div className="course-cards-review grid lg:grid-cols-4 sm:grid-cols-1 grid-flow-row-dense p-5">
                    <div className="col-span-1">
                      <div className="image-container ">

                      </div>
                      <p className="text-center">Mark zuckerburg</p>
                    </div>
                    <div className="col-span-3">
                      <Stack spacing={1}>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                      </Stack>
                      <p>This is one of the best courses I ever take in this month it help's to improve my Skill in this domain and this fantastic...</p>
                    </div>
                  </div>

                </div>
                <div className="bg-gray-300 course-cards-review-container rounded-3xl">
                  <div className="course-cards-review grid lg:grid-cols-4 sm:grid-cols-1 grid-flow-row-dense p-5">
                    <div className="col-span-1">
                      <div className="image-container ">

                      </div>
                      <p className="text-center">Mark zuckerburg</p>
                    </div>
                    <div className="col-span-3">
                      <Stack spacing={1}>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                      </Stack>
                      <p>This is one of the best courses I ever take in this month it help's to improve my Skill in this domain and this fantastic...</p>
                    </div>
                  </div>

                </div>
                <div className="bg-gray-300 course-cards-review-container rounded-3xl">
                  <div className="course-cards-review grid lg:grid-cols-4 sm:grid-cols-1 grid-flow-row-dense p-5">
                    <div className="col-span-1">
                      <div className="image-container ">

                      </div>
                      <p className="text-center">Mark zuckerburg</p>
                    </div>
                    <div className="col-span-3">
                      <Stack spacing={1}>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                      </Stack>
                      <p>This is one of the best courses I ever take in this month it help's to improve my Skill in this domain and this fantastic...</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      }
    </main>
  )

}

export default MyCourses;


const tableData = [
  {
    "Course Name": "Data Science Essentials",
    "Paid/Free": "Paid",
    "Categories": "Technology",
    "Created On": "January 12, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "AI for Everyone",
    "Paid/Free": "Free",
    "Categories": "AI",
    "Created On": "March 18, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Cybersecurity Basics",
    "Paid/Free": "Paid",
    "Categories": "Security",
    "Created On": "February 2, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Full Stack Web Development",
    "Paid/Free": "Paid",
    "Categories": "Programming",
    "Created On": "April 14, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Introduction to Cloud Computing",
    "Paid/Free": "Free",
    "Categories": "Cloud",
    "Created On": "June 10, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Marketing Analytics",
    "Paid/Free": "Paid",
    "Categories": "Marketing",
    "Created On": "July 20, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Graphic Design Masterclass",
    "Paid/Free": "Paid",
    "Categories": "Design",
    "Created On": "August 5, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Introduction to Data Visualization",
    "Paid/Free": "Free",
    "Categories": "Data Science",
    "Created On": "May 25, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Advanced Excel for Business",
    "Paid/Free": "Paid",
    "Categories": "Business",
    "Created On": "July 14, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Ethical Hacking",
    "Paid/Free": "Paid",
    "Categories": "Security",
    "Created On": "September 2, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Mobile App Development",
    "Paid/Free": "Free",
    "Categories": "Programming",
    "Created On": "October 1, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Artificial Intelligence for Business",
    "Paid/Free": "Paid",
    "Categories": "AI",
    "Created On": "August 10, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Blockchain Basics",
    "Paid/Free": "Free",
    "Categories": "Technology",
    "Created On": "April 23, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Python for Data Science",
    "Paid/Free": "Paid",
    "Categories": "Programming",
    "Created On": "June 18, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Digital Marketing Strategy",
    "Paid/Free": "Free",
    "Categories": "Marketing",
    "Created On": "July 2, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "React Native Development",
    "Paid/Free": "Paid",
    "Categories": "Programming",
    "Created On": "September 15, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "UI/UX Design Principles",
    "Paid/Free": "Paid",
    "Categories": "Design",
    "Created On": "October 5, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Introduction to SQL",
    "Paid/Free": "Free",
    "Categories": "Data Science",
    "Created On": "March 20, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "DevOps Essentials",
    "Paid/Free": "Paid",
    "Categories": "Technology",
    "Created On": "January 25, 2023",
    "Progress": "80%",
    "Action": <PreviewIcon />
  },
  {
    "Course Name": "Big Data Analytics",
    "Paid/Free": "Free",
    "Categories": "Data Science",
    "Created On": "November 18, 2023",
    "Progress": "20%",
    "Action": <PreviewIcon />
  }
];

