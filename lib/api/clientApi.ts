import { nextServer } from "../api/api";
import type { User } from "@/types/user";

export const register = async (data: SignUpRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type SignUpRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
