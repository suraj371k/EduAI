import { api } from "@/lib/backendUrl";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const signup = async (data: SignupRequest): Promise<UserResponse> => {
  const res = await api.post("/api/users/signup", data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<UserResponse> => {
  const res = await api.post("/api/users/login", data);
  return res.data;
};

export const getProfile = async (): Promise<UserResponse> => {
  const res = await api.get("/api/users/profile");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/users/logout");
  return res.data;
};
