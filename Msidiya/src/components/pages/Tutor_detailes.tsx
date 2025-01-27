import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Rating,
  Avatar,
  Input,
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
const TutorDetails = () => {
  return (
    <>
      <NavBar />
      <div className="tutordetails p-10  mt-20 ml-20">
        <div className="flex flex-row justify-between gap-10">
          <Card sx={{ maxWidth: 345 , maxHeight:500 }}>
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
            <div className="flex flex-row justify-around  gap-5 mt-2">
              <Button
                variant="contained"
                className="flex flex-row items-center font-bold p-0 col-3  justify-evenly"
              >
                <InterpreterModeIcon />
                <h3 className="w-52">One To One</h3>
              </Button>
              <Button
                variant="contained"
                className="flex flex-row items-center font-bold p-0  justify-evenly"
              >
                <GroupsIcon />
                <h3 className="w-52">View Group Classes</h3>
              </Button>
            </div>
            <div className="flex flex-col items-start justify-around gap-8">
              <div className="Languages flex flex-col justify-around items-start">
                <div className="description mb-5 mt-5">
                  <h2 className="font-bold">Description</h2>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem illo corporis fuga fugit similique, quaerat magni,
                    hic qui laborum praesentium dolorem. Et reprehenderit vel
                    voluptate debitis dicta atque ex voluptatem?
                  </span>
                </div>
                <h2 className="font-bold">Languages</h2>
                <span>Arabic ,English</span>
              </div>
              <div className="Subjects flex flex-col justify-around items-start">
                <h2 className="font-bold">Subjects which they specialize in</h2>
                <span>Engineering</span>
              </div>
              <div className="Categories flex flex-col justify-around items-start">
                <h2 className="font-bold">Categories</h2>
                <span>IT & Software</span>
              </div>
            </div>
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
            <div className="tutor_rating flex flex-col w-full items-start mt-10">
                <Card className="w-full p-2 border-b-gray-500 mb-1">

                    <h1>Tutor's Rating & Review
</h1>
                </Card>
                <Card className="w-full p-2 flex flex-col gap-10 items-start ">

                   <div className="comment w-full flex flex-row justify-between">
                    <div className="flex w-full flex-row justify-start gap-2 items-start">
                    <Avatar alt="Remy Sharp" src={techer2} />
                    <div className="flex flex-col">
                    <h1>Imed Maamri</h1>
                    <Rating
                  name="size-small"
                  defaultValue={2}
                  size="small"
                  readOnly
                />
                    </div>
                    <div className="comment_message w-full">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque maiores sapiente unde placeat distinctio. Dignissimos tempora cum harum eaque ratione,
                             exercitationem vel nostrum quod culpa quos natus numquam veritatis excepturi.
                        </p>
                    </div>
                    </div>
                 
                   
                   </div>
                   <div className="comment w-full flex flex-row justify-between">
                    <div className="flex w-full flex-row justify-start gap-2 items-start">
                    <Avatar alt="Remy Sharp" src={techer2} />
                    <div className="flex flex-col">
                    <h1>Imed Maamri</h1>
                    <Rating
                  name="size-small"
                  defaultValue={2}
                  size="small"
                  readOnly
                />
                    </div>
                    <div className="comment_message w-full">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque maiores sapiente unde placeat distinctio. Dignissimos tempora cum harum eaque ratione,
                             exercitationem vel nostrum quod culpa quos natus numquam veritatis excepturi.
                        </p>
                    </div>
                    </div>
                 
                   
                   </div>
                   <div className="comment w-full flex flex-row justify-between">
                    <div className="flex w-full flex-row justify-start gap-2 items-start">
                    <Avatar alt="Remy Sharp" src={techer2} />
                    <div className="flex flex-col">
                    <h1>Imed Maamri</h1>
                    <Rating
                  name="size-small"
                  defaultValue={2}
                  size="small"
                  readOnly
                />
                    </div>
                    <div className="comment_message w-full">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque maiores sapiente unde placeat distinctio. Dignissimos tempora cum harum eaque ratione,
                             exercitationem vel nostrum quod culpa quos natus numquam veritatis excepturi.
                        </p>
                    </div>
                    </div>
                 
                   
                   </div>


                   <div className="add_comment w-full flex flex-row items-center justify-center gap-3">
                    <div className="flex flex-col w-full">
                    <Rating
                  name="size-small"
                  defaultValue={2}
                  size="large"
                  className="mb-5"
                />
                    <TextField label="Add Comment" className="mt-5" />
                  
                    </div>
                   
                   <SendIcon className="mt-10"/>
                   </div>
                </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorDetails;
