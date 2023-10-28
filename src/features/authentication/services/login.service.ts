import {
  AdapterLoginResponse,
  EndpointLoginResponse,
  LoginCredentials,
} from "../models"

import { authApi } from "../../../services/endpoints"

import { loginAdapter } from "../adapters/login.adapter"

export const login = async (
  credentials: LoginCredentials
): Promise<AdapterLoginResponse> => {
  return authApi
    .post<EndpointLoginResponse>("/login", credentials)
    .then(response => loginAdapter(response.data))
}
