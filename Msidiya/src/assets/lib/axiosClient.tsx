import axios from "axios";

const token = JSON.parse(localStorage.getItem("token") ?? "{}");
export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,

  headers: { Authorization: `Token ${token.token}` },
});
