import axios from "axios";
import { IUser } from "../interfaces/IUser";

export interface User {
  id: number;
  username: string;
  email: string;
  Phone_number?: string;
  Address?: string;
  Picture?: string;
  Role: string;
}

export const fetchUserData = async (): Promise<IUser> => {
  try {
    const response = await axios.get("/api/users/me/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
