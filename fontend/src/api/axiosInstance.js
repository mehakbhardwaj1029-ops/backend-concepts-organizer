import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1234/api/v1/topics",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
