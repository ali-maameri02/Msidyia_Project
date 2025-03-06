import React, { useState } from "react";
import {
 
  Typography,

  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Rating,
  Avatar,
  TextField,
} from "@mui/material";
import { Slide } from "react-awesome-reveal";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
import techer1 from "../../assets/teacher1.png";
import techer2 from "../../assets/teacher2.jpg";
import math from "../../assets/math.jpg";
import VerifiedIcon from "@mui/icons-material/Verified";
import video from "../../assets/Msidiya _ E-learning Platform - Google Chrome 2024-08-24 00-38-41.mp4";
import EmailIcon from "@mui/icons-material/Email";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import GroupsIcon from "@mui/icons-material/Groups";
import TodayIcon from '@mui/icons-material/Today';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SendIcon from '@mui/icons-material/Send';
import { Outlet, useNavigate } from "react-router-dom";

const TutorOneToOne = () => {
    const [category, setCategory] = useState("Select Category");
    const [subject, setSubject] = useState("Select Subject");
    const [topic, setTopic] = useState("Select Topic");
    const [schedule, setSchedule] = useState(
      Array(7).fill({ time: "05:30-06:10", status: "Unavailable" })
    );
  
    return (
      <>
        <NavBar />
        <div className="tutordetails p-10 mt-20 ml-20">
          <div className="flex flex-row justify-between gap-10">
            <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height=""
                  className="h-64"
                  image={techer1}
                  alt="teacher1"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="flex flex-row justify-content-evenly items-center"
                  >
                    <VerifiedIcon sx={{ color: "#22D3EE" }} />
                    <span> teacher1</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    teacher1 are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <Rating
                    name="size-large"
                    defaultValue={2}
                    size="large"
                    readOnly
                  />
                  <Button
                    variant="contained"
                    className="flex flex-row items-center font-bold p-0 w-full justify-evenly"
                  >
                    <EmailIcon />
                    <h3 className="w-52">Send Message</h3>
                  </Button>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <div className="flex flex-row"></div>
              </CardActions>
            </Card>
            <div className="about_teacher w-full flex flex-col justify-around items-start">
              <video controls className="w-[59rem]">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="">
              {/* Filter Section */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Filter</h2>
                <div className="grid grid-cols-3 gap-4">
                  <select
                    className="border p-2 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    <option value="paid">Paid Class</option>
                    <option value="free">Free Class</option>
                  </select>
  
                  <select
                    className="border p-2 rounded-md"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option>Select Subject</option>
                    <option value="math">Math</option>
                    <option value="python">Python</option>
                  </select>
  
                  <select
                    className="border p-2 rounded-md"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option>Select Topic</option>
                    <option value="algebra">Algebra</option>
                    <option value="loops">Loops</option>
                  </select>
                </div>
                <button className="mt-4 bg-color3 text-white px-4 py-2 rounded-md">
                 100 DA/Slot
                </button>
              </div>
  
              {/* Schedule Section */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Schedule</h2>
                <div className="text-center mb-4">
                  All times listed are in your local timezone
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {schedule.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-4 w-full rounded-md text-center border cursor-pointer text-sm flex flex-col justify-center items-center ${
                        slot.status === "Unavailable"
                          ? "bg-gray-200 text-gray-500"
                          : "bg-green-500 text-white"
                      }`}
                      onClick={() =>
                        setSchedule((prev) =>
                          prev.map((s, i) =>
                            i === index
                              ? {
                                  ...s,
                                  status:
                                    s.status === "Unavailable"
                                      ? "Available"
                                      : "Unavailable",
                                }
                              : s
                          )
                        )
                      }
                    >
                      <div>{slot.time}</div>
                      <div>{slot.status}</div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Group Classes Section */}
              <Card className="bg-white">
              <CardActionArea>
                <CardContent className="flex flex-row justify-between items-center p-2">
                  <CardMedia
                    component="img"
                    height=""
                    className="h-36"
                    image={math}
                    alt="math"
                  ></CardMedia>
                  <div className="group_details flex flex-col w-full flex-nowrap items-start ">
                    <h2 className="font-bold">Group Class</h2>
                    <div className="rating flex flex-row items-end">
                      <Rating
                        name="size-meduim"
                        defaultValue={2}
                        size="medium"
                        readOnly
                      />
                      <span>1(1)</span>
                    </div>
                    <div className="date_time flex flex-row justify-between w-full gap-5">
                        <div className="date flex flex-row  items-center w-32 flex-nowrap">
                         <TodayIcon/>
                         <h3>
                         Apr 12,2024
                         </h3>
                        </div>
                        <div className="Time flex flex-row  items-center w-32">
                         <WatchLaterIcon/>
                         <h3>
                         Apr 12,2024
                         </h3>
                        </div>
                    </div>
                    <div className="price">
                        <h3 className="text-red-600">
                        500 DA
                            </h3> 
                    </div>
                    
                  </div>
                  <Button variant="contained" className="w-full p-0 h-10" > Book Now</Button>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className="bg-white">
              <CardActionArea>
                <CardContent className="flex flex-row justify-between items-center p-2">
                  <CardMedia
                    component="img"
                    height=""
                    className="h-36"
                    image={math}
                    alt="math"
                  ></CardMedia>
                  <div className="group_details flex flex-col w-full flex-nowrap items-start ">
                    <h2 className="font-bold">Group Class</h2>
                    <div className="rating flex flex-row items-end">
                      <Rating
                        name="size-meduim"
                        defaultValue={2}
                        size="medium"
                        readOnly
                      />
                      <span>1(1)</span>
                    </div>
                    <div className="date_time flex flex-row justify-between w-full gap-5">
                        <div className="date flex flex-row  items-center w-32 flex-nowrap">
                         <TodayIcon/>
                         <h3>
                         Apr 12,2024
                         </h3>
                        </div>
                        <div className="Time flex flex-row  items-center w-32">
                         <WatchLaterIcon/>
                         <h3>
                         Apr 12,2024
                         </h3>
                        </div>
                    </div>
                    <div className="price">
                        <h3 className="text-red-600">
                        500 DA
                            </h3> 
                    </div>
                    
                  </div>
                  <Button variant="contained" className="w-full p-0 h-10" > Book Now</Button>
                </CardContent>
              </CardActionArea>
            </Card>
              {/* Courses Section */}
             
            </div>
            </div>
            
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default TutorOneToOne;
  