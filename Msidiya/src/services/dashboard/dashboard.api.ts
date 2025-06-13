import { axiosClient } from "../../assets/lib/axiosClient";

export interface DashboardStats {
  totalCourses: {
    count: number;
    growth: number;
  };
  totalStudents: {
    count: number;
    growth: number;
  };
  groupClasses: {
    percentage: number;
    growth: number;
  };
  totalEarnings: {
    amount: number;
    growth: number;
  };
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axiosClient.get("/api/tutor/stats/");
  if (response.status !== 200) {
    throw new Error("Can't fetch dashboard stats");
  }
  return response.data;
};
