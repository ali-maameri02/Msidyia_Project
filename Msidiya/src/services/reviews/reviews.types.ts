import { IUser } from "../../interfaces/IUser";

export interface ReviewReply {
  id: number;
  user: IUser;
  comment: string;
  timestamp: string;
}

export interface BaseReview {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  timestamp: string;
  replies: ReviewReply[];
}

export interface GroupClassReview {
  /** Review ID */
  id: number;

  /** The user who posted the review */
  user: IUser;

  /** ID of the reviewed group class */
  group_class: number;

  /** Rating value (e.g. 1–5) */
  rating: number;

  /** Free‑form comment text */
  comment: string;
}

/** Alias for when you're fetching reviews by tutor (same shape) */
export type TutorReview = GroupClassReview;

/** Response from GET /api/group‑classes/:groupClassId/reviews/ */
export type GroupClassReviewsResponse = GroupClassReview[];

/** Response from GET /api/tutors/:tutorId/reviews/ */
export type TutorReviewsResponse = TutorReview[];

export interface CreateReviewData {
  rating: number;
  comment: string;
}

export interface ReplyData {
  comment: string;
}

/** Data needed to create a new review */
export interface CreateGroupClassReviewData {
  rating: number;
  comment: string;
}

/** Data needed to update an existing review */
export interface UpdateGroupClassReviewData {
  rating?: number;
  comment?: string;
}
