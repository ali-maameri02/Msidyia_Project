import { axiosClient } from "../../assets/lib/axiosClient";

export interface TutorEarnings {
  total_transactions: number;
  total_revenue: string;
  total_earnings: string;
}

export interface PayoutData {
  date: string;
  amount: number;
  commission: number;
  balance: number;
  status: "Pending" | "Approved" | "Rejected";
  tutorEarnings: number;
}

export interface PayoutStats {
  totalEarnings: number;
  commission: number;
  tutorEarnings: number;
}

export const payoutService = {
  // Get tutor earnings
  getTutorEarnings: async (): Promise<TutorEarnings> => {
    const response = await axiosClient.get(`/api/tutor/earnings/`);
    return response.data;
  },

  // Get payout statistics
  getPayoutStats: async (): Promise<PayoutStats> => {
    const response = await axiosClient.get(`/api/payouts/stats`);
    return response.data;
  },

  // Get payout history
  getPayoutHistory: async (): Promise<PayoutData[]> => {
    const response = await axiosClient.get(`/api/payouts/history`);
    return response.data;
  },

  // Request a new payout
  requestPayout: async (
    amount: number
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.post(`/api/payouts/request`, { amount });
    return response.data;
  },

  // Add bank account
  addBankAccount: async (bankDetails: {
    accountNumber: string;
    bankName: string;
    routingNumber: string;
  }): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.post(
      `/payouts/bank-account`,
      bankDetails
    );
    return response.data;
  },

  // Get stats by date range
  getStatsByDateRange: async (
    startDate: string,
    endDate: string
  ): Promise<PayoutStats> => {
    const response = await axiosClient.get(`/api/payouts/stats/range`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
