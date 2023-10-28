import { UserEmail, UserPassword } from "../../../models/user.model"

export interface LoginCredentials {
  email: UserEmail
  password: UserPassword
}

export interface EndpointLoginResponse {
  accessToken: string
  refreshToken: string
  authHeader: string
}

export interface AdapterLoginResponse {
  accessToken: string
  refreshToken: string
}
