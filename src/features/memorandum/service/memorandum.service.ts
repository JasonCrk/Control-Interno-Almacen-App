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

export const getAllMemorandums = async (
  searchQuery: string
): Promise<ListResponse<MemorandumResponse>> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .get<ListResponse<MemorandumResponse>>("", {
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
    .get<MemorandumDetails>(`/${memorandumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const createMemorandum = async (
  data: FormData
): Promise<MessageResponse> => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post<MessageResponse>("", data, {
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
      `/${memorandumId}/asignar-analista`,
      { analistaId: analystId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(response => response.data)
}

export const approveMemorandumSolicitudDesignacion = async (
  memorandumId: DocumentId
) => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post<MessageResponse>(
      `/${memorandumId}/solicitud-designacion/aprobar`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(response => response.data)
}

export const approveMemorandumDesignacion = async (
  memorandumId: DocumentId
) => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .post<MessageResponse>(`/${memorandumId}/designacion/aprobar`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const updateMemorandum: UpdateDocumentService = async ({
  documentId: memorandumId,
  data,
}) => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .put<MessageResponse>(`/${memorandumId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const deleteMemorandum: DeleteDocumentService = async memorandumId => {
  const accessToken = store.getState().auth.accessToken
  return memorandumsBaseEndpoint
    .delete<MessageResponse>(`/${memorandumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
