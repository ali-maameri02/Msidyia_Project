import React, { useState } from "react";
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
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Footer from "../Landing/Footer";
import NavBar from "../Landing/NavBar";
import {
  useGroupClassReviewsQuery,
  useCreateGroupClassReviewMutation,
} from "../../services/reviews/reviews.queries";
import { GroupClassReview } from "../../services/reviews/reviews.types";
import { useGroupClass } from "../../services/group_classes/group_classes.queries";

const GroupClassDetails: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  // Use the new queries
  const { data: groupClass } = useGroupClass(Number(classId));
  const { data: reviews = [] } = useGroupClassReviewsQuery(Number(classId));
  const createReview = useCreateGroupClassReviewMutation(Number(classId));

  const handleSubmitReview = async () => {
    if (!newReview.rating || !newReview.comment.trim()) {
      alert("Please provide both rating and comment");
      return;
    }

    try {
      await createReview.mutateAsync(newReview);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    }
  };

  if (!groupClass) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={groupClass.main_image}
            alt={groupClass.title}
          />
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

            {/* Reviews Section */}
            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>

            {/* Review Form */}
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
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
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
              {reviews.map((review: GroupClassReview) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={review.user.picture}
                      alt={review.user.username}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Typography variant="subtitle1" className="font-bold">
                          {review.user.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </Typography>
                      </div>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="body1" className="mt-2">
                        {review.comment}
                      </Typography>

                      {/* Replies */}
                      {review.replies.length > 0 && (
                        <div className="mt-4 ml-4 space-y-2">
                          {review.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="flex items-start gap-2"
                            >
                              <Avatar
                                src={reply.user.picture}
                                alt={reply.user.username}
                              />
                              <div>
                                <Typography variant="subtitle2">
                                  {reply.user.username}
                                </Typography>
                                <Typography variant="body2">
                                  {reply.comment}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default GroupClassDetails;
