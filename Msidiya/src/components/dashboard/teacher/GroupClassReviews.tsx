import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Rating,
  Avatar,
  IconButton,
  Collapse,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";

// Define the Reply type
interface Reply {
  user: string;
  comment: string;
}

// Define the Review type
interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  timestamp: string;
  replies: Reply[]; // Explicitly define the type of replies
}

const GroupClassReviews = () => {
  // Initial State with Explicit Types
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "Alice",
      rating: 5,
      comment: "Great class! Very informative.",
      timestamp: "2023-10-01",
      replies: [],
    },
    {
      id: 2,
      user: "Bob",
      rating: 4,
      comment: "Good content but could be more interactive.",
      timestamp: "2023-10-02",
      replies: [],
    },
    {
      id: 3,
      user: "Charlie",
      rating: 3,
      comment: "The pace was a bit too fast.",
      timestamp: "2023-10-03",
      replies: [],
    },
  ]);

  // State for Tutor's Reply
  const [replyText, setReplyText] = useState("");
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  // Handle Tutor's Reply Submission
  const handleReplySubmit = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
            ...review,
            replies: [...review.replies, { user: "Tutor", comment: replyText }],
          }
          : review
      )
    );
    setReplyText(""); // Clear the input field
    setExpandedReviewId(null); // Collapse the reply section
  };

  return (
    <div className="p-8">
      Reviews Section
      <Typography variant="h5" className="mb-4">
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Card key={review.id} className="mb-4">
          <CardContent>
            <div className="flex items-center mb-2">
              <Avatar className="mr-2">{review.user[0]}</Avatar>
              <Typography variant="subtitle1">{review.user}</Typography>
              <Rating value={review.rating} readOnly className="ml-auto" />
            </div>
            <Typography variant="body1" className="mb-2">
              {review.comment}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {review.timestamp}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => setExpandedReviewId(expandedReviewId === review.id ? null : review.id)}>
              <ReplyIcon />
            </IconButton>
          </CardActions>
          {/* Reply Section */}
          <Collapse in={expandedReviewId === review.id} timeout="auto" unmountOnExit>
            <CardContent>
              {/* Display Existing Replies */}
              {review.replies.length > 0 && (
                <div className="pl-6">
                  <Typography variant="h6" className="mb-2">
                    Replies:
                  </Typography>
                  {review.replies.map((reply, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Avatar className="mr-2">T</Avatar>
                      <Typography variant="body1">{reply.comment}</Typography>
                    </div>
                  ))}
                </div>
              )}
              {/* Tutor's Reply Input */}
              <div className="flex items-center">
                <TextField
                  fullWidth
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="mr-2"
                />
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => handleReplySubmit(review.id)}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default GroupClassReviews;
