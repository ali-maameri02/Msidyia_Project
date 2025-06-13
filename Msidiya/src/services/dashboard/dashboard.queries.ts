import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, DashboardStats } from "./dashboard.api";

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
};
