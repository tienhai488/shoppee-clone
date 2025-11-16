import path from "src/constants/path";
import type { AuthResponse } from "src/types/auth.type";
import type { User } from "src/types/user.type";
import http from "src/utils/http";

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.register, body);
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.login, body);
  },
  logout() {
    return http.post<null>(path.logout);
  },
  getProfile() {
    return http.get<User>(path.profile);
  }
}

export default authApi;