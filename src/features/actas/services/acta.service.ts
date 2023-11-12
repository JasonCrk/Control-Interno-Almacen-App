import { store } from "../../../store"

import { CreateDocumentService } from "../../../models/service.model"

import { actasBaseEndpoint } from "../../../services/endpoints"

export const createActaInventario: CreateDocumentService = async data => {
  const accessToken = store.getState().auth.accessToken
  return actasBaseEndpoint
    .post("/inventario", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
