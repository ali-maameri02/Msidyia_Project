import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  DashboardStats,
  getGroupClassCompletionStats,
  getMonthlyEarningStats,
  MonthlyEarningStats,
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

export const useMonthlyEarningStats = () => {
  return useQuery<MonthlyEarningStats>({
    queryKey: ["monthlyEarningStats"],
    queryFn: getMonthlyEarningStats,
  });
};
