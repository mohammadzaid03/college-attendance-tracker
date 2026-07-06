import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getDashboardData = async () => {
  const response = await API.get("/dashboard");

  return response.data;
};