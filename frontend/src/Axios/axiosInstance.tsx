import axios from "axios";
import AuthContext from "../Context/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
    withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;