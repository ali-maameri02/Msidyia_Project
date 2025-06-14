import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Rating,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import { useGroupClassReviewsQuery } from "../../../services/reviews/reviews.queries";
import { GroupClassReview } from "../../../services/reviews/reviews.types";
import { useAuth } from "../../../hooks/useAuth";

const GroupClassReviews = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Get all reviews
  const { data: reviews = [] } = useGroupClassReviewsQuery();

  // Filter reviews based on search term
  const filteredReviews = reviews.filter((review: GroupClassReview) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      review.comment.toLowerCase().includes(searchLower) ||
      review.user.username.toLowerCase().includes(searchLower)
    );
  });

  // Group reviews by class
  const reviewsByClass = filteredReviews.reduce(
    (acc: Record<number, GroupClassReview[]>, review: GroupClassReview) => {
      const classId = review.group_class;
      if (!acc[classId]) {
        acc[classId] = [];
      }
      acc[classId].push(review);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Group Class Reviews
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search reviews by student name or review content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      {/* Reviews by Class */}
      <div className="space-y-6">
        {Object.entries(reviewsByClass).map(([classId, classReviews]) => {
          const reviews = classReviews as GroupClassReview[];
          return (
            <Card key={classId} className="mb-4">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Class ID: {classId}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Reviews: {reviews.length}
                </Typography>
                <Divider className="my-4" />

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review: GroupClassReview) => (
                    <Card key={review.id} variant="outlined" className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar
                          src={review.user.Picture}
                          alt={review.user.username}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="subtitle1"
                              className="font-bold"
                            >
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {Object.keys(reviewsByClass).length === 0 && (
        <Typography variant="body1" className="text-center text-gray-500">
          No reviews found
        </Typography>
      )}
    </div>
  );
};

export default GroupClassReviews;
