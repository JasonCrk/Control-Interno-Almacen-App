import { Document, DocumentItem } from "../../../models/document.model"

export interface MemorandumResponse extends DocumentItem {}

export interface DetailedMemorandum extends Document {
  status: string
}

export interface MemorandumFormData {
  title: string
  document: File
}
