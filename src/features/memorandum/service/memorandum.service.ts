import { store } from "../../../store"

import { ListResponse, MessageResponse } from "../../../models/response.model"
import { MemorandumResponse } from "../models"

import { memorandumsBaseEndpoint } from "../../../services/endpoints"

export const getAllMemorandumsSolicitudDesignacion = async (
  searchQuery: string
): Promise<ListResponse<MemorandumResponse>> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .get<ListResponse<MemorandumResponse>>("/solicitud-designacion", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: searchQuery,
      },
    })
    .then(response => response.data)
}

export const createMemorandumSolicitudDesignacion = async (
  data: FormData
): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post("/solicitud-designacion", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
