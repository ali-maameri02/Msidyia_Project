import { axiosClient } from "../../assets/lib/axiosClient";
import { IUser } from "../../interfaces/IUser";

export const getCurrentLoggedUserProfile = async () => {
  const response = await axiosClient.get("/api/users/me/");

  return response.data as IUser;
};
