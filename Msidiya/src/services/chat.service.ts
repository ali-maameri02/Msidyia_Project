import { axiosClient } from "../assets/lib/axiosClient";

export interface IMessage {
  id:number;
  sender_username: string;
  receiver_username: string;
  receiver_avatar: string | null;
  Sender: number;
  Receiver: number;
  Content: string;
  Time: string;
}
interface ICreateMessageDTO {
  Content: string;
  Receiver: number;
}

export const getUserSentMessages = async () => {
  const response = await axiosClient.get("/api/chat/sent");
  if (response.status != 200) {
    throw new Error("can't fetch the messages");
  }
  return response.data as IMessage[];
};

export const getLatestMessages = async () => {
  const response = await axiosClient.get("/api/chats/");

  if (response.status != 200) {
    throw new Error("can't fetch the messages");
  }
  return response.data as IMessage[];
};

export const getMessagesBetweenus = async (userId: number) => {
  const response = await axiosClient.get(`api/chats/with/${userId}/`);

  if (response.status != 200) {
    throw new Error("can't fetch the messages");
  }
  return response.data as IMessage[];
};
export const sendMessageToUser = async (data: ICreateMessageDTO) => {
  const response = await axiosClient.post("/api/chats/", data);
  if (response.status != 201) {
    throw new Error("can't send the message");
  }
  return response.data as IMessage[];
};
