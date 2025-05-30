
export interface   IMessage {
  id: number;
  Content: string;
  Sender: number;
  Receiver: number;
  sender_username: string;
  receiver_username: string;
  receiver_avatar: string | null;
  Time: string;
}

