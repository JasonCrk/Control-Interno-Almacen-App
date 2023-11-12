import { Document, DocumentItem } from "../../../models/document.model"
import { UserItem } from "../../../models/user.model"

export interface MemorandumResponse extends DocumentItem {
  assigned: UserItem | null
}

export interface MemorandumDetails extends Document {
  status: string
}
