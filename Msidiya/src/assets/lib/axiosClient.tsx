import axios from "axios";


const token = JSON.parse(localStorage.getItem('token') ?? "{}")
export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: "https://msidiya.com",

  headers: { Authorization: `Token ${token.token}` },
})
