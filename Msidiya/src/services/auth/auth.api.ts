// import { axiosClient } from "../../assets/lib/axiosClient";

import { axiosClient, setAuthToken } from "../../assets/lib/axiosClient";

export const login = async (username: string, password: string) => {
  const response = await axiosClient.post("/api/login/", {
    username,
    password,
  });
  if (response.data && response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data));
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
  setAuthToken(null);
};
