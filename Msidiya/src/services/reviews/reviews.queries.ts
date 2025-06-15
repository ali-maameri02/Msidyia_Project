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
    onSuccess: (data) => {
      // Invalidate the specific group class reviews
      queryClient.invalidateQueries({
        queryKey: ["groupClassReviews", groupClassId],
      });

      // Invalidate all group class reviews to ensure the list is updated
      queryClient.invalidateQueries({ queryKey: ["groupClassReviews"] });

      // Invalidate tutor reviews if this is a tutor's review
      queryClient.invalidateQueries({ queryKey: ["tutorReviews"] });

      // Optimistically update the cache
      queryClient.setQueryData<GroupClassReviewsResponse>(
        ["groupClassReviews", groupClassId],
        (old = []) => [...old, data]
      );
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
      queryClient.invalidateQueries({ queryKey: ["tutorReviews"] });
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
      queryClient.invalidateQueries({ queryKey: ["tutorReviews"] });
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
      queryClient.invalidateQueries({ queryKey: ["tutorReviews"] });
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
