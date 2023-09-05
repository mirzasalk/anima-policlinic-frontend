import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
console.log(url);
const api = axios.create({
  baseURL: url,
});

export default api;
