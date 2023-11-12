import { store } from "../../../store"

import { ListResponse } from "../../../models/response.model"
import { UserItem } from "../../../models/user.model"

import { userBaseEndpoint } from "../../../services/endpoints"

export const searchAnalysts = async (
  searchQuery: string
): Promise<ListResponse<UserItem>> => {
  const accessToken = store.getState().auth.accessToken
  return userBaseEndpoint
    .get("/analistas", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: searchQuery,
      },
    })
    .then(response => response.data)
}
