import { UserLoginData } from "../types";
import { api } from "./client";

// Auth Service
export const loginAPI = (credentials: UserLoginData) => api.post("/auth/login", credentials);
export const getSelfAPI = () => api.get("/auth/self");
export const logoutAPI = () => api.post("/auth/logout");
