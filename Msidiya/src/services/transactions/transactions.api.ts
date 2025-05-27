import { axiosClient } from "../../assets/lib/axiosClient";
import { ITransaction } from "../../interfaces/ITransaction";

export const getUserTranasctions = async () => {
  const response = await axiosClient.get("/api/e_wallet/transactions/");
  if (response.status != 200) throw new Error("can't fetch transactions");
  return response.data as ITransaction[];
};
