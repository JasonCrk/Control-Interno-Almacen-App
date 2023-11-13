import { store } from "../../../store"

import {
  Document,
  DocumentId,
  DocumentItem,
} from "../../../models/document.model"
import { CreateDocumentService } from "../../../models/service.model"
import { ListResponse, MessageResponse } from "../../../models/response.model"

import { informeBaseEndpoint } from "../../../services/endpoints"

export const getAllInformesSustentoDiferencias = async (): Promise<
  ListResponse<DocumentItem>
> => {
  const accessToken = store.getState().auth.accessToken
  return informeBaseEndpoint
    .get<ListResponse<DocumentItem>>("/sustento-diferencias", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const getInformeSustentoDiferenciasById = async (
  informeId: DocumentId
): Promise<Document> => {
  const accessToken = store.getState().auth.accessToken
  return informeBaseEndpoint
    .get<Document>("/sustento-diferencias/" + informeId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

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
