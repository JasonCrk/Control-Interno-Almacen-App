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
    role: [UserRole.JEFE_UNIDAD_LOGISTICA],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/inventario",
    name: "Actas de inventario",
    role: [UserRole.JEFE_UNIDAD_LOGISTICA],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/sustento-diferencias",
    name: "Informes de sustento de diferencias",
    role: [UserRole.JEFE_UNIDAD_LOGISTICA],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/faltante/subir",
    name: "Subir informe de faltante",
    role: [UserRole.JEFE_UNIDAD_LOGISTICA],
  },
  {
    id: crypto.randomUUID(),
    to: "/memorandums/designacion",
    name: "Memorandums de designación",
    role: [UserRole.JEFE_UNIDAD_FINANZAS],
  },
  {
    id: crypto.randomUUID(),
    to: "/informes/sustento-diferencias/subir",
    name: "Subir informe de sustento de diferencias",
    role: [UserRole.TECNICO_ADMINISTRATIVO_ALMACEN],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/entrega-productos-sin-fines-lucro/subir",
    name: "Subir acta de entrega de productos sin fines de lucro",
    role: [UserRole.TECNICO_ADMINISTRATIVO_ALMACEN],
  },
  {
    id: crypto.randomUUID(),
    to: "/productos",
    name: "Lista de productos",
    role: [UserRole.TECNICO_ADMINISTRATIVO_ALMACEN, UserRole.ANALISTA_FINANZAS],
  },
  {
    id: crypto.randomUUID(),
    to: "/memorandums/solicitud-designacion",
    name: "Memorandums de solicitud de designación",
    role: [
      UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA,
      UserRole.JEFE_UNIDAD_FINANZAS,
      UserRole.JEFE_UNIDAD_LOGISTICA,
      UserRole.ASISTENTE,
    ],
  },
  {
    id: crypto.randomUUID(),
    to: "/actas/inventario/subir",
    name: "Subir acta de inventario",
    role: [UserRole.ANALISTA_FINANZAS],
  },
]
