import { UserRole } from "../../../models/user.model"

interface LinkItem {
  id: string
  to: string
  name: string
  role: (keyof typeof UserRole | string)[]
}

export const LINKS: LinkItem[] = [
  {
    id: crypto.randomUUID(),
    to: "/memorandums/solicitud-asignacion",
    name: "Memorandums de solicitud de asignación",
    role: ["JEFE_UNIDAD_LOGISTICA"],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/inventario",
    name: "Actas de inventario",
    role: ["JEFE_UNIDAD_LOGISTICA"],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/sustento-diferencias",
    name: "Informes de sustento de diferencias",
    role: ["JEFE_UNIDAD_LOGISTICA"],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/faltante/subir",
    name: "Subir informe de faltante",
    role: ["JEFE_UNIDAD_LOGISTICA"],
  },
  {
    id: crypto.randomUUID(),
    to: "/memorandums/designacion",
    name: "Memorandums de designación",
    role: ["ASISTENTE", "JEFE_UNIDAD_FINANZAS"],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/sustento-diferencias/subir",
    name: "Subir informe de sustento de diferencias",
    role: ["TECNICO_ADMINISTRATIVO_ALMACEN"],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/entrega-productos-sin-fines-lucro/subir",
    name: "Subir acta de entrega de productos sin fines de lucro",
    role: ["TECNICO_ADMINISTRATIVO_ALMACEN"],
  },
  {
    id: crypto.randomUUID(),
    to: "/productos",
    name: "Lista de productos",
    role: ["TECNICO_ADMINISTRATIVO_ALMACEN", "ANALISTA_FINANZAS"],
  },
  {
    id: crypto.randomUUID(),
    to: "/memorandums/solicitud-designacion",
    name: "Memorandums de solicitud de designación",
    role: ["TECNICO_ADMINISTRATIVO_LOGISTICA", "JEFE_UNIDAD_FINANZAS"],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/inventario/subir",
    name: "Subir acta de inventario",
    role: ["ANALISTA_FINANZAS"],
  },
]
