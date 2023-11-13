import { Document, DocumentItem } from "../../../models/document.model"
import { UserItem } from "../../../models/user.model"

export enum MemorandumStatus {
  APROBADO = "Aprobado",
  PENDIENTE = "Pendiente",
}

export interface MemorandumResponse extends DocumentItem {
  assigned: UserItem | null
  status: MemorandumStatus
}

export interface MemorandumDetails extends Document {
  status: MemorandumStatus
}
