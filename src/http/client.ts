import axios from "axios";

export const api = axios.create({
  // format for the accessing of .env variables
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  // since we are using cookies, the cookies will be stored in the browser and cookies are sent
  // for each request automatically
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
