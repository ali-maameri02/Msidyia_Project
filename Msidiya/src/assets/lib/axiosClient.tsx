import axios from "axios";


const token = JSON.parse(localStorage.getItem('token') ?? "{}")
export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000",

  headers: { Authorization: `Token ${token.token}` },
})
