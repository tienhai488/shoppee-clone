import type { User } from "./user.type";
import type { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
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
