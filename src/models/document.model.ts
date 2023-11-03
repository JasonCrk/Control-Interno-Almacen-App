export type DocumentId = number
export type DocumentTitle = string
export type DocumentCreatedAt = string

export interface Document {
  id: DocumentId
  title: DocumentTitle
  createdAt: DocumentCreatedAt
}
