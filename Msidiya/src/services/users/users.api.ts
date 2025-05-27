import { axiosClient } from "../../assets/lib/axiosClient";
import { IUser } from "../users.service";

export const getCurrentLoggedUserProfile = async () => {
  const response = await axiosClient.get("/api/users/me/");
  if (response.status != 200) throw new Error("can't fetch the profile");

  return response.data as IUser;
};
