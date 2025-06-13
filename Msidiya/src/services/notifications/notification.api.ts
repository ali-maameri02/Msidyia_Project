import { INotification } from "../../interfaces/INotification";

export interface ICreateNotificationDTO {
  user: string;
  message: string;
  type: string;
}

export interface IUpdateNotificationDTO {
  status?: boolean;
}

// API endpoints
export const NOTIFICATION_ENDPOINTS = {
  BASE: "/api/notifications/",
  MARK_READ: (id: number) => `api/notifications/${id}/read/`,
  MARK_ALL_READ: "api/notifications/mark-all-read/",
  DELETE: (id: number) => `api/notifications/${id}/`,
} as const;

// API response types
export type GetNotificationsResponse = INotification[];
export type MarkNotificationReadResponse = INotification;
