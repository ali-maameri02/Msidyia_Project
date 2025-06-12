import { axiosClient } from "../../assets/lib/axiosClient";

export const getWalletBalance = async () => {
  const response = await axiosClient.get("/api/e_wallet/balance");
  return response.data;
};

export const fillWallet = async (amount: number) => {
  const response = await axiosClient.post("/api/e_wallet/checkout", { amount });
  return response.data;
};
