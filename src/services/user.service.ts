import { UserAuth } from "../models/user.model"

import { authBaseEndpoint } from "./endpoints"

export const getUserAuthByAccessToken = async (
  accessToken: string
): Promise<UserAuth> => {
  return authBaseEndpoint
    .get<UserAuth>("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
