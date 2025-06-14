import { axiosClient } from "../../assets/lib/axiosClient";
import {
  CreateGroupClassReviewData,
  UpdateGroupClassReviewData,
} from "./reviews.types";

// Tutor Reviews
export const getTutorReviews = async (tutorId: string | number) => {
  const response = await axiosClient.get(`/api/tutor/${tutorId}/reviews/`);
  return response.data;
};

export const createTutorReview = async (
  tutorId: string | number,
  reviewData: {
    rating: number;
    comment: string;
  }
) => {
  const response = await axiosClient.post(
    `/api/tutor/${tutorId}/reviews/`,
    reviewData
  );
  return response.data;
};

export const replyToTutorReview = async (
  reviewId: string | number,
  replyData: {
    comment: string;
  }
) => {
  const response = await axiosClient.post(
    `/api/reviews/${reviewId}/reply/`,
    replyData
  );
  return response.data;
};

// Group Class Reviews
export const getGroupClassReviews = async () => {
  const response = await axiosClient.get("/api/group-class-reviews/");
  return response.data;
};

export const getGroupClassReview = async (id: number) => {
  const response = await axiosClient.get(`/api/group-class-reviews/${id}/`);
  return response.data;
};

export const createGroupClassReview = async (
  reviewData: CreateGroupClassReviewData
) => {
  const response = await axiosClient.post(
    "/api/group-class-reviews/",
    reviewData
  );
  return response.data;
};

export const updateGroupClassReview = async (
  id: number,
  reviewData: UpdateGroupClassReviewData
) => {
  const response = await axiosClient.put(
    `/api/group-class-reviews/${id}/`,
    reviewData
  );
  return response.data;
};

export const patchGroupClassReview = async (
  id: number,
  reviewData: UpdateGroupClassReviewData
) => {
  const response = await axiosClient.patch(
    `/api/group-class-reviews/${id}/`,
    reviewData
  );
  return response.data;
};

export const deleteGroupClassReview = async (id: number) => {
  const response = await axiosClient.delete(`/api/group-class-reviews/${id}/`);
  return response.data;
};
