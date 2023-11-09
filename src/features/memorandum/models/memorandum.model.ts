import { Document } from "../../../models/document.model"

export interface MemorandumResponse extends Document {}

export interface DetailedMemorandum extends Document {
  documentUrl: string
  status: string
}

export interface MemorandumFormData {
  title: string
  document: File
}
