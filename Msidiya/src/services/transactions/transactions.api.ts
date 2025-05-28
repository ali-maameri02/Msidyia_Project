import { axiosClient } from "../../assets/lib/axiosClient";
import { IGroupClassTransaction } from "../../interfaces/IGroupClassTransaction";
import { ITransaction } from "../../interfaces/ITransaction";

export const getUserTranasctions = async () => {
  const response = await axiosClient.get("/api/e_wallet/transactions/");
  if (response.status != 200) throw new Error("can't fetch transactions");
  return response.data as ITransaction[];
};

export const getGroupClassTransactions = async (search?: string) => {
  const params = search ? { search } : {};
  const response = await axiosClient.get("/api/e_wallet/group-class-transactions/", { params });
  if (response.status != 200) throw new Error("can't fetch group class transactions");
  return response.data.data as IGroupClassTransaction[];
};

export const getGroupClassTransactionsStats = async () => {
  const response = await axiosClient.get("/api/e_wallet/group-class-transactions/stats/");
  if (response.status != 200) throw new Error("can't fetch group class transactions stats");
  return response.data.stats;
};
