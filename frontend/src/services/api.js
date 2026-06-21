import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1606",
  withCredentials: true,
});

export default api;
