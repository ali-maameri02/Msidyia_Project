import { axiosClient } from "../assets/lib/axiosClient";

export interface IUser {
  id: number;
  username: string;
  Picture: string;
}

export const getAllUsers = async () => {
  const response = await axiosClient.get("/api/users/");
  if (response.status != 200) throw new Error("can't fetch users");
  return response.data as IUser;
};
