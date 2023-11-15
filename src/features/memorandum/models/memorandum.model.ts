import { Document, DocumentItem } from "../../../models/document.model"
import { UserItem } from "../../../models/user.model"

export enum MemorandumStatus {
  APROBADO = "Aprobado",
  PENDIENTE = "Pendiente",
}

export enum MemorandumType {
  SOLICITUD_DESIGNACION = "Solicitud designacion",
  DESIGNACION = "Designacion",
}

export interface MemorandumResponse extends DocumentItem {
  assigned: UserItem | null
  status: MemorandumStatus
  type: MemorandumType
}

export interface MemorandumDetails extends Document {
  status: MemorandumStatus
  type: MemorandumType
}
