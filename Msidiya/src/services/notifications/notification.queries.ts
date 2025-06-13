import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../assets/lib/axiosClient";
import {
  GetNotificationsResponse,
  MarkNotificationReadResponse,
  NOTIFICATION_ENDPOINTS,
} from "./notification.api";

// Query keys
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  detail: (id: number) => [...notificationKeys.all, "detail", id] as const,
};

// Get all notifications
export const useNotifications = () => {
  return useQuery<GetNotificationsResponse>({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      const response = await axiosClient.get(NOTIFICATION_ENDPOINTS.BASE);
      return response.data;
    },
  });
};

// Mark notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<MarkNotificationReadResponse, Error, number>({
    mutationFn: async (notificationId) => {
      const response = await axiosClient.patch(
        NOTIFICATION_ENDPOINTS.MARK_READ(notificationId)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};

// Mark all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: async () => {
      await axiosClient.patch(NOTIFICATION_ENDPOINTS.MARK_ALL_READ);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};

// Delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (notificationId) => {
      await axiosClient.delete(NOTIFICATION_ENDPOINTS.DELETE(notificationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};
