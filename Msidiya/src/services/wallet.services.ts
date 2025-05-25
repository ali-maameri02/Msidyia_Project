import { axiosClient } from "../assets/lib/axiosClient";

export const getUserWalletBalance = async (): Promise<string> => {
    const response = await axiosClient.get("/api/e_wallet/wallet/");
    const amount = response.data[0].balance;
    if (response.status != 200) {
      throw new Error("can't fetch the user points");
    }
    return amount
};
