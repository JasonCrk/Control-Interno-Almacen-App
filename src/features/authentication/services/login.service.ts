import { AuthTokensResponse, LoginCredentials } from "../models"

import { authBaseEndpoint } from "../../../services/endpoints"

export const login = async (
  credentials: LoginCredentials
): Promise<AuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>("/login", credentials)
    .then(response => response.data)
}
