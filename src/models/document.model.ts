export type DocumentId = number
export type DocumentTitle = string
export type DocumentCreatedAt = string
export type DocumentUrl = string

export interface Document {
  id: DocumentId
  title: DocumentTitle
  createdAt: DocumentCreatedAt
  documentUrl: DocumentUrl
}

export interface DocumentItem extends Omit<Document, "documentUrl"> {}

export interface CreateDocumentData {
  title: DocumentTitle
  document: File
}

export interface UpdateDocumentData {
  title: DocumentTitle
  document?: File
}
