export interface ITransaction {
  id: number;
  sender: string; // in the future we will need to use a IUserBasic interface to limit the data returned from the backend and a UserBasicSerializer
  receiver: string;
  amount: string;
  type: "send" | "receive" | "enroll" | "launch_class" | "refund";
  note: string | null;
  created_at: string;
}
