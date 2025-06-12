import axios from "axios";
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
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/signup/`,
    {
      username,
      password,
      Role,
    }
  );
  return response.data;
};
