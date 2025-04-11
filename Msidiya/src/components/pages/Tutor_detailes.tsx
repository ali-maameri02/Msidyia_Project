import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Rating,
  TextField,
  MenuItem,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import GroupsIcon from "@mui/icons-material/Groups";
import TodayIcon from "@mui/icons-material/Today";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
interface User {
  id: number;
  username: string;
  email: string;
  Picture: string;
}

interface Tutor {
  user: User; // Change from string to an object
  id: number;
  name: string;
  Description: string;
  rating: number;
  Intro_video: string;
  languages: string[];
  subjects: string[];
  categories: string[];
  groupClassImage: string;
  groupClassRating: number;
  groupClassReviews: string;
  groupClassDate: string;
  groupClassTime: string;
}
interface GroupClass {
  id: number;
  title: string;
  age_range: string;
  grade: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  max_book: number;
  class_type: string;
  main_image: string;
  date_created: string;
  status: string;
  last_time: string;
  tutor: Tutor;

}
interface Category {
  
  id: number;
  tutor:Tutor;
  name: string;
  status: boolean;
  // subjects?: Subject[];
}


const TutorDetails = () => {

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const { tutorId } = useParams();
  // const [tutor, setTutor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        // Fetch tutor details
        const response = await axios.get(`http://127.0.0.1:8000/api/tutor/${tutorId}/`);
        setTutor(response.data);
  
        // Fetch all group classes
        const Groupclasseresponse = await axios.get(`http://127.0.0.1:8000/api/group-classes/`);
  
        // Filter group classes by the tutor's user ID
        const TutorGroupclass = Groupclasseresponse.data.filter(
          (cls: GroupClass) => cls.tutor === response.data.user.id // Match tutor's user ID
        );
        setGroupClasses(TutorGroupclass);
        console.log(TutorGroupclass);
  
        // Fetch categories
        const CategoriesResponse = await axios.get(`http://127.0.0.1:8000/api/categories/`);
  
        // Filter categories by the tutor's user ID
        const FiltredCategories = CategoriesResponse.data.filter(
          (category: Category) => category.tutor === response.data.user.id 
        );
        setCategories(FiltredCategories);
        console.log(FiltredCategories);
  
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      }
    };
    fetchTutorDetails();
  }, [tutorId]);
  if (!tutor) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="tutordetails p-10 mt-20 ml-20">
        <div className="flex flex-row justify-between gap-10">
          {/* Left Side - Tutor Card */}
          <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                className="h-64 p-2"
                image={tutor.user?.Picture || "default-image.jpg"}
                alt={tutor.user?.username}
              />
              <CardContent>
                <Typography variant="h5" className="flex flex-row items-center">
                  <VerifiedIcon sx={{ color: "#22D3EE" }} />
                  <span>{tutor.user?.username || "Unknown Tutor"}</span>
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {tutor.Description || "No description available."}
                </Typography>
                <Rating name="size-large" value={tutor.rating || 0} size="large" readOnly />
                <Button variant="contained" className="flex items-center w-full justify-evenly">
                  <EmailIcon />
                  <h3>Send Message</h3>
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Right Side - Tutor Details */}
          <div className="about_teacher w-full flex flex-col justify-around">
            <video controls className="w-[59rem]">
              <source src={tutor.Intro_video || "default-video.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="flex flex-row justify-around gap-5 mt-2">
              <Button
                variant="contained"
                className="flex items-center font-bold p-0 col-3"
                onClick={() => navigate(`/Tutors/TutorDetails/TutorOneToOne`)}
              >
                <InterpreterModeIcon />
                <h3>One To One</h3>
              </Button>
              <Button variant="contained" className="flex items-center font-bold p-0">
                <GroupsIcon />
                <h3>View Group Classes</h3>
              </Button>
            </div>

            {/* Description & Details */}
            <div className="flex flex-col items-start gap-8">
              <div className="Languages">
                <h2 className="font-bold">Description</h2>
                <span>{tutor.Description || "No description available."}</span>
              </div>
              <div className="Languages">
                <h2 className="font-bold">Languages</h2>
                <span>{tutor.languages?.join(", ") || "Not specified"}</span>
              </div>
              {/* <div className="Subjects">
                <h2 className="font-bold">Subjects</h2>
                <span>{tutor.subjects?.join(", ") || "Not specified"}</span>
              </div> */}
              <div className="Categories">
                <h2 className="font-bold">Categories</h2>
                {categories.length > 0 ? (
  <span>
    {categories.map((category) => category.name).join(", ") || "Not specified"}
  </span>
) : (
  <span>Not specified</span>
)}

              </div>
            </div>

            {/* Group Class Details */}
         {/* Display Group Classes */}
{/* Display Group Classes */}
<div className="group-classes mt-10 w-full">
  <Typography variant="h5" className="font-bold">Group Classes</Typography>

  {groupClasses.map((groupClass) => (
    <Card key={groupClass.id} className="bg-white ">
      <CardActionArea>
        <CardContent className="flex flex-col p-4">
          {/* Card Content Section */}
          <div className="flex flex-row justify-between items-center">
            <div className="image h-36 w-1/2">
            <CardMedia
              className="h-36 w-36 rounded-lg"
              component={'img'}
              image={groupClass.main_image || "default-class.jpg"}
              alt={groupClass.title}
            /></div>
            <div className="group_details flex flex-col w-full flex-nowrap items-start p-2">
              <Typography variant="h6" className="font-bold w-full">{groupClass.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Age Range: {groupClass.age_range}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grade: {groupClass.grade}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${groupClass.price}
              </Typography>
              <div className="date_time flex flex-row justify-start w-full gap-5">
                <div className="date flex flex-row items-center w-32 flex-nowrap">
                  <TodayIcon />
                  <h3>Apr 12, 2024</h3>
                </div>
                <div className="time flex flex-row items-center w-32">
                  <WatchLaterIcon />
                  <h3>Apr 12, 2024</h3>
                </div>
              </div>
              <div className="rating flex flex-row items-end">
                <Rating name="size-medium" defaultValue={2} size="medium" readOnly />
                <span>1(1)</span>
              </div>
            </div>
            <Button 
  variant="contained" 
  color="primary"
  className="mt-2 w-1/2 h-1/3"
  onClick={() => navigate(`/group-class/${groupClass.id}`)}
>
  Enroll Now
</Button>
            </div>
        
        </CardContent> {/* Closing tag added */}
      </CardActionArea>
    </Card>
  ))}
</div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorDetails;
