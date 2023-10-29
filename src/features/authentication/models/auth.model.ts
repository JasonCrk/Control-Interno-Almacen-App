import { UserEmail, UserPassword } from "../../../models/user.model"

export interface LoginCredentials {
  email: UserEmail
  password: UserPassword
}

export interface AuthTokensResponse {
  accessToken: string
  refreshToken: string
  authHeader: string
}

export interface AdapterAuthTokensResponse {
  accessToken: string
  refreshToken: string
}
