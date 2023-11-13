import { store } from "../../../store"

import {
  Document,
  DocumentId,
  DocumentItem,
} from "../../../models/document.model"
import { CreateDocumentService } from "../../../models/service.model"
import { ListResponse, MessageResponse } from "../../../models/response.model"

import { actasBaseEndpoint } from "../../../services/endpoints"

export const getAllActasInventario = async (): Promise<
  ListResponse<DocumentItem>
> => {
  const accessToken = store.getState().auth.accessToken
  return actasBaseEndpoint
    .get<ListResponse<DocumentItem>>("/inventario", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const getActaInventarioById = async (
  actaId: DocumentId
): Promise<Document> => {
  const accessToken = store.getState().auth.accessToken
  return actasBaseEndpoint
    .get<Document>("/inventario/" + actaId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const createActaInventario: CreateDocumentService = async (
  data
): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return actasBaseEndpoint
    .post<MessageResponse>("/inventario", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const createActaEntregaProductosSinFinesDeLucro: CreateDocumentService =
  async (data): Promise<MessageResponse> => {
    const accessToken = store.getState().auth.accessToken
    return actasBaseEndpoint
      .post<MessageResponse>("/entrega-productos-sin-fines-lucro", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => response.data)
  }
