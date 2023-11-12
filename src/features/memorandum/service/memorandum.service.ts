import { store } from "../../../store"

import {
  DeleteDocumentService,
  UpdateDocumentService,
} from "../../../models/service.model"
import { UserId } from "../../../models/user.model"
import { DocumentId } from "../../../models/document.model"
import { ListResponse, MessageResponse } from "../../../models/response.model"

import { MemorandumDetails, MemorandumResponse } from "../models"

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

export const getMemorandumById = async (
  memorandumId: DocumentId
): Promise<MemorandumDetails> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .get<MemorandumDetails>("/solicitud-designacion/" + memorandumId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const createMemorandumSolicitudDesignacion = async (
  data: FormData
): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post<MessageResponse>("/solicitud-designacion", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const assignAnalystToMemorandum = async ({
  memorandumId,
  analystId,
}: {
  memorandumId: DocumentId
  analystId: UserId
}): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post<MessageResponse>(
      `/solicitud-designacion/${memorandumId}/asignar-analista`,
      { analistaId: analystId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(response => response.data)
}

export const updateMemorandumSolicitudDesignacion: UpdateDocumentService =
  async ({ documentId: memorandumId, data }) => {
    const accessToken = store.getState().auth.accessToken
    return memorandumsBaseEndpoint
      .put<MessageResponse>("/solicitud-designacion/" + memorandumId, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => response.data)
  }

export const deleteMemorandumSolicitudDesignacion: DeleteDocumentService =
  async memorandumId => {
    const accessToken = store.getState().auth.accessToken
    return memorandumsBaseEndpoint
      .delete<MessageResponse>("/solicitud-designacion/" + memorandumId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => response.data)
  }
