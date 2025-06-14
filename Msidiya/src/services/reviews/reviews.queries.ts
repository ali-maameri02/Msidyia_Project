import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGroupClassReviews,
  getGroupClassReview,
  createGroupClassReview,
  updateGroupClassReview,
  patchGroupClassReview,
  deleteGroupClassReview,
} from "./reviews.api";
import {
  CreateGroupClassReviewData,
  UpdateGroupClassReviewData,
} from "./reviews.types";

// Group Class Reviews Queries
export const useGroupClassReviewsQuery = () => {
  return useQuery({
    queryKey: ["groupClassReviews"],
    queryFn: getGroupClassReviews,
  });
};

export const useGroupClassReviewQuery = (id: number) => {
  return useQuery({
    queryKey: ["groupClassReview", id],
    queryFn: () => getGroupClassReview(id),
  });
};

export const useCreateGroupClassReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: CreateGroupClassReviewData) =>
      createGroupClassReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
    },
  });
};

export const useUpdateGroupClassReviewMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: UpdateGroupClassReviewData) =>
      updateGroupClassReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
      queryClient.invalidateQueries({ queryKey: ["groupClassReview", id] });
    },
  });
};

export const usePatchGroupClassReviewMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: UpdateGroupClassReviewData) =>
      patchGroupClassReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
      queryClient.invalidateQueries({ queryKey: ["groupClassReview", id] });
    },
  });
};

export const useDeleteGroupClassReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteGroupClassReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
    },
  });
};
