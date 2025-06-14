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
  Box,
  Avatar,
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
import { useGroupClassReviewsQuery } from "../../services/reviews/reviews.queries";
import { GroupClassReview } from "../../services/reviews/reviews.types";

interface User {
  id: number;
  username: string;
  email: string;
  Picture: string;
}

interface Tutor {
  user: User;
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
  tutor: Tutor;
  name: string;
  status: boolean;
}

const TutorDetails = () => {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const { tutorId } = useParams();
  const navigate = useNavigate();

  // Get all reviews
  const { data: reviews = [] } = useGroupClassReviewsQuery();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        // Fetch tutor details
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/tutor/${tutorId}/`
        );
        setTutor(response.data);

        // Fetch all group classes
        const Groupclasseresponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/group-classes/`
        );

        // Filter group classes by the tutor's user ID
        const TutorGroupclass = Groupclasseresponse.data.filter(
          (cls: GroupClass) => cls.tutor === response.data.user.id
        );
        setGroupClasses(TutorGroupclass);

        // Fetch categories
        const CategoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
        );

        // Filter categories by the tutor's user ID
        const FiltredCategories = CategoriesResponse.data.filter(
          (category: Category) => category.tutor === response.data.user.id
        );
        setCategories(FiltredCategories);
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      }
    };
    fetchTutorDetails();
  }, [tutorId]);

  const handleSubmitReview = async () => {
    if (!newReview.rating || !newReview.comment.trim()) {
      alert("Please provide both rating and comment");
      return;
    }

    try {
      // TODO: Implement review submission when the API is available
      alert("Review submission is not yet implemented");
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    }
  };

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
                <Rating
                  name="size-large"
                  value={tutor.rating || 0}
                  size="large"
                  readOnly
                />
                <Button
                  variant="contained"
                  className="flex items-center w-full justify-evenly"
                >
                  <EmailIcon />
                  <h3>Send Message</h3>
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Right Side - Tutor Details */}
          <div className="about_teacher w-full flex flex-col justify-around">
            <video controls className="w-[59rem]">
              <source
                src={tutor.Intro_video || "default-video.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="flex flex-row justify-around gap-5 mt-2">
              <Button
                variant="contained"
                className="flex items-center font-bold p-0 col-3"
                onClick={() =>
                  navigate(`/Tutors/TutorDetails/${tutor.user.id}/OneToOne`)
                }
              >
                <InterpreterModeIcon />
                <h3>One To One</h3>
              </Button>
              <Button
                variant="contained"
                className="flex items-center font-bold p-0"
              >
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
              <div className="Categories">
                <h2 className="font-bold">Categories</h2>
                {categories.length > 0 ? (
                  <span>
                    {categories.map((category) => category.name).join(", ")}
                  </span>
                ) : (
                  <span>Not specified</span>
                )}
              </div>
            </div>

            {/* Group Class Details */}
            {groupClasses.map((groupClass) => (
              <Card key={groupClass.id} className="bg-white">
                <div className="group_details flex flex-col w-full flex-nowrap items-start p-2">
                  <Typography variant="h6" className="font-bold w-full">
                    {groupClass.title}
                  </Typography>
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
                    <Rating
                      name="size-medium"
                      defaultValue={2}
                      size="medium"
                      readOnly
                    />
                    <span>1(1)</span>
                  </div>
                </div>
              </Card>
            ))}

            {/* Reviews Section */}
            <Card className="mb-6 p-4">
              <Typography variant="h6" gutterBottom>
                Write a Review
              </Typography>
              <Box className="mb-4">
                <Rating
                  value={newReview.rating}
                  onChange={(_, value) =>
                    setNewReview((prev) => ({ ...prev, rating: value || 0 }))
                  }
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="mb-4"
              />
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!newReview.rating || !newReview.comment.trim()}
              >
                Submit Review
              </Button>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews
                .filter(
                  (review: GroupClassReview) => review.group_class === tutor.id
                )
                .map((review: GroupClassReview) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={review.user.Picture}
                        alt={review.user.username}
                        sx={{ width: 40, height: 40 }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Typography variant="subtitle1" className="font-bold">
                            {review.user.username}
                          </Typography>
                        </div>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body1" className="mt-2">
                          {review.comment}
                        </Typography>
                      </div>
                    </div>
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
