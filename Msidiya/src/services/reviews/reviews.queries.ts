import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGroupClassReviews,
  getGroupClassReview,
  createGroupClassReview,
  updateGroupClassReview,
  patchGroupClassReview,
  deleteGroupClassReview,
  getTutorReviews,
} from "./reviews.api";
import {
  CreateGroupClassReviewData,
  UpdateGroupClassReviewData,
  GroupClassReview,
  GroupClassReviewsResponse,
  TutorReviewsResponse,
} from "./reviews.types";

// Group Class Reviews Queries
export const useGroupClassReviewsQuery = (groupClassId: string | number) => {
  return useQuery<GroupClassReviewsResponse>({
    queryKey: ["groupClassReviews", groupClassId],
    queryFn: () => getGroupClassReviews(groupClassId),
  });
};

export const useGroupClassReviewQuery = (id: number) => {
  return useQuery<GroupClassReview>({
    queryKey: ["groupClassReview", id],
    queryFn: () => getGroupClassReview(id),
  });
};

export const useCreateGroupClassReviewMutation = (
  groupClassId: string | number
) => {
  const queryClient = useQueryClient();
  return useMutation<GroupClassReview, Error, CreateGroupClassReviewData>({
    mutationFn: (reviewData) =>
      createGroupClassReview(groupClassId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupClassReviews", groupClassId],
      });
    },
  });
};

export const useUpdateGroupClassReviewMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<GroupClassReview, Error, UpdateGroupClassReviewData>({
    mutationFn: (reviewData) => updateGroupClassReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
      queryClient.invalidateQueries({ queryKey: ["groupClassReview", id] });
    },
  });
};

export const usePatchGroupClassReviewMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<GroupClassReview, Error, UpdateGroupClassReviewData>({
    mutationFn: (reviewData) => patchGroupClassReview(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
      queryClient.invalidateQueries({ queryKey: ["groupClassReview", id] });
    },
  });
};

export const useDeleteGroupClassReviewMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => deleteGroupClassReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });
      queryClient.invalidateQueries({ queryKey: ["groupClassReview", id] });
    },
  });
};

// Tutor Reviews Queries
export const useTutorReviewsQuery = (tutorId: string | number) => {
  return useQuery<TutorReviewsResponse>({
    queryKey: ["tutorReviews", tutorId],
    queryFn: () => getTutorReviews(tutorId),
  });
};
