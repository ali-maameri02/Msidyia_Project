import { useMutation, useQuery } from "@tanstack/react-query";
import { fillWallet, getWalletBalance } from "./wallet.api";
import { queryManager } from "../query.manager";

export const WALLET_QUERIES_KEY = {
  GET_BALANCE: ["wallet", "balance"],
  FILL_WALLET: ["wallet", "fill"],
} as const;

export const useWalletBalance = () => {
  return useQuery({
    queryKey: WALLET_QUERIES_KEY.GET_BALANCE,
    queryFn: getWalletBalance,
  });
};

export const useFillWallet = () => {
  return useMutation({
    mutationFn: fillWallet,
    onSuccess: () => {
      queryManager.invalidate(WALLET_QUERIES_KEY.GET_BALANCE);
    },
  });
};
