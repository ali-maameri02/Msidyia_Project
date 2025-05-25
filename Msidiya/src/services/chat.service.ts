import { axiosClient } from "../assets/lib/axiosClient";

export interface IMessage {
  sender_username: string;
  receiver_username: string;
  Sender: number;
  Receiver: number;
  Content: string;
  Time: string;
}

export const getUserSentMessages = async () => {
  const response = await axiosClient.get("/api/chat/sent");
  if (response.status != 200) {
    throw new Error("can't fetch the messages");
  }
  return response.data as IMessage[];
};
