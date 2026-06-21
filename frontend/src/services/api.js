import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-app-backend-6sdw.onrender.com/",
  withCredentials: true,
});

export default api;
