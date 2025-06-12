import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

const token = JSON.parse(localStorage.getItem("token") ?? "{}");
if (token && token.token) {
  setAuthToken(token.token);
}
