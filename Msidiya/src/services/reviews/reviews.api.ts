import { axiosClient } from "../../assets/lib/axiosClient";
import {
  CreateGroupClassReviewData,
  UpdateGroupClassReviewData,
  GroupClassReview,
  GroupClassReviewsResponse,
  TutorReviewsResponse,
} from "./reviews.types";

// ───────────────
// Tutor Reviews
// ───────────────

// List all reviews for a tutor
export const getTutorReviews = async (
  tutorId: string | number
): Promise<TutorReviewsResponse> => {
  const response = await axiosClient.get(`/api/tutors/${tutorId}/reviews/`);
  return response.data;
};

// (Optional) If you ever want to allow posting tutor‐level reviews,
// although our backend currently only supports class‐level reviews.
// If you implement a tutor‐review POST endpoint later, adjust here.
// export const createTutorReview = async (tutorId: string | number, reviewData: { rating: number; comment: string; }) => {
//   const response = await axiosClient.post(`/api/tutors/${tutorId}/reviews/`, reviewData);
//   return response.data;
// };

// ────────────────────
// Group‐Class Reviews
// ────────────────────

// List all reviews for a specific group‐class
export const getGroupClassReviews = async (
  groupClassId: string | number
): Promise<GroupClassReviewsResponse> => {
  const response = await axiosClient.get(
    `/api/group-classes/${groupClassId}/reviews/`
  );
  return response.data;
};

// Create a new review on a specific group‐class
export const createGroupClassReview = async (
  groupClassId: string | number,
  reviewData: CreateGroupClassReviewData
): Promise<GroupClassReview> => {
  const response = await axiosClient.post(
    `/api/group-classes/${groupClassId}/reviews/`,
    reviewData
  );
  return response.data;
};

// If you still need to fetch/update/delete a single review by its ID
// (we still have the detail view at /api/group-class-reviews/:id/):

export const getGroupClassReview = async (
  id: number
): Promise<GroupClassReview> => {
  const response = await axiosClient.get(`/api/group-class-reviews/${id}/`);
  return response.data;
};

export const updateGroupClassReview = async (
  id: number,
  reviewData: UpdateGroupClassReviewData
): Promise<GroupClassReview> => {
  const response = await axiosClient.put(
    `/api/group-class-reviews/${id}/`,
    reviewData
  );
  return response.data;
};

export const patchGroupClassReview = async (
  id: number,
  reviewData: UpdateGroupClassReviewData
): Promise<GroupClassReview> => {
  const response = await axiosClient.patch(
    `/api/group-class-reviews/${id}/`,
    reviewData
  );
  return response.data;
};

export const deleteGroupClassReview = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/group-class-reviews/${id}/`);
};
