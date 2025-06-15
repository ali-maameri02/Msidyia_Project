import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { payoutService, PayoutData, PayoutStats } from "./payoutService";

export const usePayoutStats = () => {
  return useQuery<PayoutStats>({
    queryKey: ["payoutStats"],
    queryFn: payoutService.getPayoutStats,
  });
};

export const usePayoutHistory = () => {
  return useQuery<PayoutData[]>({
    queryKey: ["payoutHistory"],
    queryFn: payoutService.getPayoutHistory,
  });
};

export const usePayoutStatsByDateRange = (
  startDate: string,
  endDate: string
) => {
  return useQuery<PayoutStats>({
    queryKey: ["payoutStats", startDate, endDate],
    queryFn: () => payoutService.getStatsByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};

export const useRequestPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payoutService.requestPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payoutStats"] });
      queryClient.invalidateQueries({ queryKey: ["payoutHistory"] });
    },
  });
};

export const useAddBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payoutService.addBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payoutStats"] });
    },
  });
};
