import { AdapterLoginResponse, EndpointLoginResponse } from "../models"

export const loginAdapter = (
  data: EndpointLoginResponse
): AdapterLoginResponse => ({
  accessToken: data.accessToken,
  refreshToken: data.refreshToken,
})
