import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // Important for cookies
});

export default axiosInstance;
