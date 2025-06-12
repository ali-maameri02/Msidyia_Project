// Get latest messages/conversations for the current user

import { axiosClient } from "../../assets/lib/axiosClient";
import { ICreateMessageDTO } from "../../interfaces/dto/ICreateMessageDTO";
import { IMessage } from "../../interfaces/IMessage";
import { IUserWithChat } from "../../interfaces/IUserWithChat";

// Returns IUserWithChat[] - users with their latest chat info
export const getLatestMessages = async (): Promise<IUserWithChat[]> => {
  try {
    const response = await axiosClient.get("/api/chats/");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    throw error;
  }
};

// Get messages between current user and a specific user
export const getMessagesBetweenus = async (
  userId: number
): Promise<IMessage[]> => {
  try {
    const response = await axiosClient.get(`/api/chats/with/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages between users:", error);
    throw error;
  }
};

// Send a message to a user
export const sendMessageToUser = async (
  messageData: ICreateMessageDTO
): Promise<IMessage> => {
  try {
    const response = await axiosClient.post("/api/chats/", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Search for users
export const searchUsers = async (query: string): Promise<IUserWithChat[]> => {
  try {
    const response = await axiosClient.get(
      `/api/chats/?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const getUserSentMessages = async () => {
  const response = await axiosClient.get("/api/chat/sent");
  if (response.status != 200) {
    throw new Error("can't fetch the messages");
  }
  return response.data as IMessage[];
};

// Get a specific user's information
export const getUserById = async (userId: number): Promise<IUserWithChat> => {
  try {
    const response = await axiosClient.get(`/api/users/${userId}/`);
    return { user: response.data };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
