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

export type DocumentItem = Omit<Document, "documentUrl">
