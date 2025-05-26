import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
  Rating,
  TextField,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Landing/Footer";
import NavBar from "../Landing/NavBar";

interface Topic {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  date: string;
  duration: string;
  topic: Topic;
}

interface GroupClass {
  id: number;
  title: string;
  grade: string;
  price: number;
  category: {
    name: string;
  };
  max_book: number;
  class_type: string;
  main_image: string;
  user: {
    username: string;
  };
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  user?: {
    id: number;
    username: string;
    Picture: string;
  }
  group_class: number;
}

const GroupClassDetails: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();

  const [groupClass, setGroupClass] = useState<GroupClass | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [rating, setRating] = useState<number | null>(4);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Assume user is stored in localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const fetchReviews = async () => {
    try {
      const res = await axios.get<Review[]>(`http://127.0.0.1:8000/api/group-class-reviews/`);
      setReviews(res.data.filter((r) => r.group_class === Number(classId)));
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axios.get<GroupClass>(
          `http://127.0.0.1:8000/api/group-classes/${classId}/`
        );
        setGroupClass(classRes.data);

        const scheduleRes = await axios.get<Schedule[]>(
          `http://127.0.0.1:8000/api/available-schedules/?group_class=${classId}`
        );
        setSchedules(scheduleRes.data);

        await fetchReviews();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classId]);

  const handleBookNow = (scheduleId: number) => {
    // Navigate to booking confirmation or payment page
    navigate(`/booking-confirm?schedule=${scheduleId}&class=${classId}`);
  };

  const handleAddReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please fill in both rating and review.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/group-class-reviews/`,
        {
          rating,
          comment,
          user: user.id,
          group_class: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRating(null);
      setComment("");
      await fetchReviews();
    } catch (err) {
      console.error("Failed to submit review", err);
      alert("Could not submit review.");
    } finally {
      setLoading(false);
    }
  };

  if (!groupClass) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
        <Card>
          <CardMedia component="img" height="300" image={groupClass.main_image} alt={groupClass.title} />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {groupClass.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Tutor: {groupClass.user?.username || "Unknown"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Grade: {groupClass.grade}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Amount: {groupClass.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Category: {groupClass.category.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Type: {groupClass.class_type}</Typography>
              </Grid>

            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Schedules */}
            <Typography variant="h6" gutterBottom>
              Available Schedules
            </Typography>
            <Grid container spacing={2}>
              {schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <Grid item xs={12} sm={6} key={schedule.id}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="body2">Date: {new Date(schedule.date).toLocaleString()}</Typography>
                      <Typography variant="body2">Duration: {schedule.duration}</Typography>
                      <Typography variant="body2">
                        Topic: {schedule.topic?.name || "No Topic"}
                      </Typography>

                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>No schedules available</Typography>
              )}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Reviews */}
            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 2 }}>
                  <div className="content flex flex-row justify-between items-start">
                    <div className="left flex flex-row items-start">
                      <img className="rounded-full w-12 h-12" src={review.user?.Picture} alt="" />
                      <Typography variant="caption"> {review.user?.username}</Typography>
                    </div>
                    <div className="right flex flex-col items-end w-full">
                      <Rating value={review.rating} readOnly precision={0.5} size="small" />
                      <Typography variant="body2" className="bg-gray-100 w-full rounded-lg p-2">{review.comment}</Typography>

                    </div>
                  </div>

                </Box>
              ))
            ) : (
              <Typography>No reviews yet.</Typography>
            )}

            {/* Add Review */}
            {user && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Add Your Review
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Write your review"
                  multiline
                  rows={3}
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddReview}
                  disabled={loading}
                >
                  Submit Review
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default GroupClassDetails;
