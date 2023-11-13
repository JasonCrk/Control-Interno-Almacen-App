import { store } from "../../../store"

import { MessageResponse } from "../../../models/response.model"
import { CreateDocumentService } from "../../../models/service.model"

import { informeBaseEndpoint } from "../../../services/endpoints"

export const createInformeSustentoDiferencias: CreateDocumentService = async (
  data
): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return informeBaseEndpoint
    .post<MessageResponse>("/sustento-diferencias", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
