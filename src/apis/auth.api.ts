import path from "src/constants/path";
import type { AuthResponse } from "src/types/auth.type";
import http from "src/utils/http";

export const registerAccount = (body: { email: string, password: string }) => http.post<AuthResponse>(path.register, body);

export const loginAccount = (body: { email: string, password: string }) => http.post<AuthResponse>(path.login, body);

export const logout = () => http.post(path.logout);