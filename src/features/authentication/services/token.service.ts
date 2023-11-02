import { MessageResponse } from "../../../models/response.model"
import { AuthTokensResponse } from "../models"

import { authBaseEndpoint } from "../../../services/endpoints"

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
): Promise<AuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>("/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(response => response.data)
}
