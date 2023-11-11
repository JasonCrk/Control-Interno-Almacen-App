import { Document, DocumentItem } from "../../../models/document.model"

export interface MemorandumResponse extends DocumentItem {}

export interface MemorandumDetails extends Document {
  status: string
}
