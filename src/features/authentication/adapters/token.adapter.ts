import { AdapterAuthTokensResponse, AuthTokensResponse } from "../models"

export const authTokensAdapter = (
  data: AuthTokensResponse
): AdapterAuthTokensResponse => ({
  accessToken: data.accessToken,
  refreshToken: data.refreshToken,
})
