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

export interface GroupClassCompletionStats {
  completed: number;
  not_completed: number;
}

export interface MonthlyEarningStats {
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axiosClient.get("/api/tutor/stats/");
  if (response.status !== 200) {
    throw new Error("Can't fetch dashboard stats");
  }
  return response.data;
};

export const getGroupClassCompletionStats =
  async (): Promise<GroupClassCompletionStats> => {
    const response = await axiosClient.get("/api/group-classes/tutor/stats/");
    if (response.status !== 200) {
      throw new Error("Can't fetch group class completion stats");
    }
    return response.data;
  };

export const getMonthlyEarningStats =
  async (): Promise<MonthlyEarningStats> => {
    const response = await axiosClient.get(
      "/api/group-classes/earnings/stats/"
    );
    if (response.status !== 200) {
      throw new Error("Can't fetch monthly earnings stats");
    }
    return response.data;
  };
