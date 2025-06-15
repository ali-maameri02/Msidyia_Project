import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export interface PayoutData {
  date: string;
  amount: number;
  commission: number;
  balance: number;
  status: "Pending" | "Approved" | "Rejected";
}

export interface PayoutStats {
  totalEarnings: number;
  commission: number;
  tutorEarnings: number;
}

export const payoutService = {
  // Get payout statistics
  getPayoutStats: async (): Promise<PayoutStats> => {
    const response = await axios.get(`${API_URL}/payouts/stats`);
    return response.data;
  },

  // Get payout history
  getPayoutHistory: async (): Promise<PayoutData[]> => {
    const response = await axios.get(`${API_URL}/payouts/history`);
    return response.data;
  },

  // Request a new payout
  requestPayout: async (
    amount: number
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axios.post(`${API_URL}/payouts/request`, { amount });
    return response.data;
  },

  // Add bank account
  addBankAccount: async (bankDetails: {
    accountNumber: string;
    bankName: string;
    routingNumber: string;
  }): Promise<{ success: boolean; message: string }> => {
    const response = await axios.post(
      `${API_URL}/payouts/bank-account`,
      bankDetails
    );
    return response.data;
  },

  // Get stats by date range
  getStatsByDateRange: async (
    startDate: string,
    endDate: string
  ): Promise<PayoutStats> => {
    const response = await axios.get(`${API_URL}/payouts/stats/range`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
