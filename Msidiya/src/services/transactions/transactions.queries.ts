import { useQuery } from "@tanstack/react-query";
import * as api from "./transactions.api";

export const transactionsQueryKeys = {
  allUserTransactions: ["user_transactions"],
  allGroupClassTransactions: ["group_class_transactions"],
  groupClassTransactionsWithSearch: (search?: string) => ["group_class_transactions", search],
  groupClassTransactionsStats: ["group_class_transactions_stats"],
};

export const useUserTransactions = () =>
  useQuery({
    queryKey: transactionsQueryKeys.allUserTransactions,
    queryFn: api.getUserTranasctions,
  });




export const useGroupClassTransactions = (search?: string) =>
  useQuery({
    queryKey: transactionsQueryKeys.groupClassTransactionsWithSearch(search),
    queryFn: () => api.getGroupClassTransactions(search),
  });

export const useGroupClassTransactionsStats = () =>
  useQuery({
    queryKey: transactionsQueryKeys.groupClassTransactionsStats,
    queryFn: api.getGroupClassTransactionsStats,
  });
