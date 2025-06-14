import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./group_classes.api";
import {
  GroupClass,
  CreateGroupClassData,
  CreateGroupClassSessionData,
} from "./group_classes.types";

export const groupClassQueryKeys = {
  all: ["group-classes"] as const,
  lists: () => [...groupClassQueryKeys.all, "list"] as const,
  detail: (id: number) => [...groupClassQueryKeys.all, "detail", id] as const,
  tutor: (tutorId: number) =>
    [...groupClassQueryKeys.all, "tutor", tutorId] as const,
};

// Get all group classes
export const useGroupClasses = () => {
  return useQuery<GroupClass[]>({
    queryKey: groupClassQueryKeys.lists(),
    queryFn: api.getGroupClasses,
  });
};

// Get group class by ID
export const useGroupClass = (id: number) => {
  return useQuery<GroupClass>({
    queryKey: groupClassQueryKeys.detail(id),
    queryFn: () => api.getGroupClassById(id),
    enabled: !!id,
  });
};

// Create group class
export const useCreateGroupClass = () => {
  const queryClient = useQueryClient();

  return useMutation<GroupClass, Error, CreateGroupClassData>({
    mutationFn: api.createGroupClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupClassQueryKeys.lists() });
    },
  });
};

// Create group class session
export const useCreateGroupClassSession = () => {
  const queryClient = useQueryClient();

  return useMutation<GroupClass, Error, CreateGroupClassSessionData>({
    mutationFn: api.createGroupClassSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupClassQueryKeys.lists() });
    },
  });
};

// Delete group class
export const useDeleteGroupClass = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: api.deleteGroupClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupClassQueryKeys.lists() });
    },
  });
};
