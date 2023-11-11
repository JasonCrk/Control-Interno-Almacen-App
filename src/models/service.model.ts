import { DocumentId } from "./document.model"
import { MessageResponse } from "./response.model"

export type CreateDocumentService = (data: FormData) => Promise<MessageResponse>

export type UpdateDocumentService = ({
  documentId,
  data,
}: {
  documentId: DocumentId
  data: FormData
}) => Promise<MessageResponse>

export type DeleteDocumentService = (
  documentId: DocumentId
) => Promise<MessageResponse>
