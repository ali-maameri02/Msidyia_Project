import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  DashboardStats,
  getGroupClassCompletionStats,
} from "./dashboard.api";

export interface GroupClassCompletionStats {
  completed: number;
  not_completed: number;
}

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
};

export const useGroupClassCompletionStats = () => {
  return useQuery<GroupClassCompletionStats>({
    queryKey: ["groupClassCompletionStats"],
    queryFn: getGroupClassCompletionStats,
  });
};
