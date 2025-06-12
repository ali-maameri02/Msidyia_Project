import { IUser } from "../../interfaces/IUser";
import { axiosClient } from "../../assets/lib/axiosClient";

export const getCurrentLoggedUserProfile = async () => {
  const response = await axiosClient.get("/api/users/me/");

  return response.data as IUser;
};

export const createUser = async (
  username: string,
  password: string,
  Role: string
) => {
  const response = await axiosClient.post("/api/signup/", {
    username,
    password,
    Role,
  });
  return response.data;
};
