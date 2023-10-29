import {
  AdapterAuthTokensResponse,
  AuthTokensResponse,
  LoginCredentials,
} from "../models"

import { authBaseEndpoint } from "../../../services/endpoints"

import { authTokensAdapter } from "../adapters/token.adapter"

export const login = async (
  credentials: LoginCredentials
): Promise<AdapterAuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>("/login", credentials)
    .then(response => authTokensAdapter(response.data))
}
