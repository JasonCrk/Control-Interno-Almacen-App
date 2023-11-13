import { store } from "../../../store"

import { CreateDocumentService } from "../../../models/service.model"

import { actasBaseEndpoint } from "../../../services/endpoints"
import { MessageResponse } from "../../../models/response.model"

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
