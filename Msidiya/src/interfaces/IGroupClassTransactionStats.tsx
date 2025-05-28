export interface IGroupClassTransactionStats {
  total_transactions: number;
  total_revenue: number;
  total_earnings: number;
  monthly_breakdown: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
}
