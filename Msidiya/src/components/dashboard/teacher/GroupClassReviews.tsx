import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Rating,
  TextField,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useGroupClassReviewsQuery } from "../../../services/reviews/reviews.queries";
import { useGroupClassesQuery } from "../../../services/groupClasses/groupClasses.queries";
import { GroupClassReview } from "../../../services/reviews/reviews.types";
import { GroupClass } from "../../../services/groupClasses/groupClasses.types";

interface GroupClassReviewsProps {
  groupClassId?: string | number;
}

const GroupClassReviews: React.FC<GroupClassReviewsProps> = ({
  groupClassId: initialGroupClassId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroupClassId, setSelectedGroupClassId] = useState<
    string | number | ""
  >(initialGroupClassId || "");

  // Get all group classes for the filter
  const { data: groupClasses = [] } = useGroupClassesQuery();

  // Get reviews for the selected group class
  const { data: reviews = [] } = useGroupClassReviewsQuery(
    selectedGroupClassId || initialGroupClassId || ""
  );

  // Filter reviews based on search term
  const filteredReviews = reviews.filter((review: GroupClassReview) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      review.comment.toLowerCase().includes(searchLower) ||
      review.user.username.toLowerCase().includes(searchLower)
    );
  });

  const handleGroupClassChange = (event: any) => {
    setSelectedGroupClassId(event.target.value);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Group Class</InputLabel>
          <Select
            value={selectedGroupClassId}
            onChange={handleGroupClassChange}
            label="Select Group Class"
          >
            <MenuItem value="">All Group Classes</MenuItem>
            {groupClasses.map((groupClass: GroupClass) => (
              <MenuItem key={groupClass.id} value={groupClass.id}>
                {groupClass.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Search reviews"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredReviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Avatar
                src={review.user.Picture}
                alt={review.user.username}
                sx={{ mr: 2 }}
              />
              <div>
                <Typography variant="subtitle1">
                  {review.user.first_name} {review.user.last_name}
                </Typography>
                <Rating value={review.rating} readOnly precision={0.5} />
              </div>
            </div>
            <Typography variant="body1">{review.comment}</Typography>
          </CardContent>
        </Card>
      ))}

      {filteredReviews.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No reviews found
        </Typography>
      )}
    </div>
  );
};

export default GroupClassReviews;
