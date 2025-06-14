export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  Role: "Student" | "Tutor";
  Gender: "Male" | "Female";
  Phone_number: string;
  Paypal_Email: string;
  Address: string;
  Zip_code: number;
  Picture: string;
}

export interface ReviewReply {
  id: number;
  user: User;
  comment: string;
  timestamp: string;
}

export interface BaseReview {
  id: number;
  user: User;
  rating: number;
  comment: string;
  timestamp: string;
  replies: ReviewReply[];
}

export interface TutorReview extends BaseReview {
  tutorId: number;
}

export interface GroupClassReview {
  id: number;
  user: User;
  group_class: number;
  rating: number;
  comment: string;
}

export interface CreateReviewData {
  rating: number;
  comment: string;
}

export interface ReplyData {
  comment: string;
}

export interface CreateGroupClassReviewData {
  user: number;
  group_class: number;
  rating: number;
  comment: string;
}

export interface UpdateGroupClassReviewData {
  user?: number;
  group_class?: number;
  rating?: number;
  comment?: string;
}
