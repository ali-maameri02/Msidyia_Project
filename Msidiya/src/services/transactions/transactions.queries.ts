import { useQuery } from "@tanstack/react-query";
import * as api from "./transactions.api";

export const transactionsQueryKeys = {
  allUserTransactions: ["user_transactions"],
};

export const useUserTransactions = () =>
  useQuery({
    queryKey: transactionsQueryKeys.allUserTransactions,
    queryFn: api.getUserTranasctions,
  });
