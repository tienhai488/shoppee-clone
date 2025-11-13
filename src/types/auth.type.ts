import type { User } from "./user.type";
import type { ResponseApi } from "./utils.type";

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>

const auth: AuthResponse = {
  message: "Authentication successful",
  data: {}
}
