import { store } from "../../../store"

import { authBaseEndpoint } from "../../../services/endpoints"

export const logout = async (): Promise<void> => {
  const accessToken = store.getState().auth.accessToken
  authBaseEndpoint.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
