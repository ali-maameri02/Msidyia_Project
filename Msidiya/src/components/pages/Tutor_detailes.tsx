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
  MenuItem,
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
const TutorDetails = () => {
  const navigate = useNavigate();
  const handleviewOne_TO_One = () => {
    navigate(`/Tutors/TutorDetails/TutorOneToOne`); // Redirect to the update route with the class ID
  };

  const [filters, setFilters] = useState({
    availability: "",
    grade: "",
    category: "",
    subject: "",
    topic: "",
    country: "",
  });
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const filterOptions = {
    grades: ["Grade 1", "Grade 2", "Grade 3"],
    categories: ["Math", "Science", "English"],
    subjects: ["Algebra", "Physics", "Grammar"],
    topics: ["Equations", "Thermodynamics", "Sentence Structure"],
    countries: ["USA", "Canada", "France"],
  };
  return (
    <>
      <NavBar />
      <div className="tutordetails p-10  mt-20 ml-20">
        <div className="flex flex-row justify-between gap-10">
          <div className="leftside flex flex-col ">


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
                 {/* Filter Section */}
          <div className="filter-section p-4 bg-gray-100 rounded-md mb-6">
            <h2 className="font-bold mb-4">Filter</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Availability */}
              <TextField
                label="Availability"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.value)}
                fullWidth
              />
              {/* Grades */}
              <TextField
                select
                label="Grades"
                value={filters.grade}
                onChange={(e) => handleFilterChange("grade", e.target.value)}
                fullWidth
              >
                {filterOptions.grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </TextField>
              {/* Categories */}
              <TextField
                select
                label="Categories"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                fullWidth
              >
                {filterOptions.categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              {/* Subjects */}
              <TextField
                select
                label="Subjects"
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                fullWidth
              >
                {filterOptions.subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
              {/* Topics */}
              <TextField
                select
                label="Topics"
                value={filters.topic}
                onChange={(e) => handleFilterChange("topic", e.target.value)}
                fullWidth
              >
                {filterOptions.topics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              </TextField>
              {/* Countries */}
              <TextField
                select
                label="Countries"
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                fullWidth
              >
                {filterOptions.countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          </div>
          
          <div className="filter"></div>
          <div className="about_teacher w-full flex flex-col justify-around items-start">
            <video controls className="w-[59rem]">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex flex-row justify-around  gap-5 mt-2">
              <Button
                variant="contained"
                className="flex flex-row items-center font-bold p-0 col-3  justify-evenly"
                onClick={handleviewOne_TO_One}
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
        <CardContent className="flex flex-col p-4">
     

          {/* Card Content Section */}
          <div className="flex flex-row justify-between items-center">
            <CardMedia
              component="img"
              height=""
              className="h-36"
              image={math}
              alt="math"
            />
            <div className="group_details flex flex-col w-full flex-nowrap items-start">
              <h2 className="font-bold">Group Class</h2>
              <div className="rating flex flex-row items-end">
                <Rating
                  name="size-medium"
                  defaultValue={2}
                  size="medium"
                  readOnly
                />
                <span>1(1)</span>
              </div>
              <div className="date_time flex flex-row justify-between w-full gap-5">
                <div className="date flex flex-row items-center w-32 flex-nowrap">
                  <TodayIcon />
                  <h3>Apr 12, 2024</h3>
                </div>
                <div className="time flex flex-row items-center w-32">
                  <WatchLaterIcon />
                  <h3>Apr 12, 2024</h3>
                </div>
              </div>
              <div className="price">
                <h3 className="text-red-600">500 DA</h3>
              </div>
            </div>
            <Button variant="contained" className="w-full p-0 h-10">
              Book Now
            </Button>
          </div>
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
      <Outlet /> {/* This renders nested routes */}

      <Footer />

    </>
  );
};

export default TutorDetails;
