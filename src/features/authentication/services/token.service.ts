import { AdapterAuthTokensResponse, AuthTokensResponse } from "../models"
import { MessageResponse } from "../../../models/response.model"

import { authBaseEndpoint } from "../../../services/endpoints"

import { authTokensAdapter } from "../adapters/token.adapter"

export const verifyToken = async (
  accessToken: string | null
): Promise<MessageResponse> => {
  return authBaseEndpoint
    .get<MessageResponse>("/verify-token", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const refreshAuthTokens = async (
  refreshToken: string | null
): Promise<AdapterAuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>("/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(response => authTokensAdapter(response.data))
}
