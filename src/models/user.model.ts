export type Roles = {
  [key: string]: string
}

export const userRoles: Roles = {
  ADMIN: "Administrador",
  JEFE_UNIDAD_FINANZAS: "Jefe Unidad de Finanzas",
  ASISTENTE: "Asistente",
  JEFE_UNIDAD_LOGISTICA: "Jefe Unidad de Logística",
  TECNICO_ADMINISTRATIVO_ALMACEN: "Técnico Administrativo de Almacén",
  TECNICO_ADMINISTRATIVO_LOGISTICA: "Técnico Administrativo de Logística",
  ANALISTA_FINANZAS: "Analista Finanzas",
}

export enum UserRole {
  ADMIN = "ADMIN",
  JEFE_UNIDAD_FINANZAS = "JEFE_UNIDAD_FINANZAS",
  ASISTENTE = "ASISTENTE",
  JEFE_UNIDAD_LOGISTICA = "JEFE_UNIDAD_LOGISTICA",
  TECNICO_ADMINISTRATIVO_ALMACEN = "TECNICO_ADMINISTRATIVO_ALMACEN",
  TECNICO_ADMINISTRATIVO_LOGISTICA = "TECNICO_ADMINISTRATIVO_LOGISTICA",
  ANALISTA_FINANZAS = "ANALISTA_FINANZAS",
}

export type UserId = number
export type UserAvatar = string
export type UserFirstName = string
export type UserLastName = string
export type UserEmail = string
export type UserPassword = string
export type UserDni = string
export type UserPhoneNumber = string

export interface User {
  id: UserId
  avatar: UserAvatar
  firstName: UserFirstName
  lastName: UserLastName
  email: UserEmail
  password: UserPassword
  dni: UserDni
  phoneNumber: UserPhoneNumber
  role: UserRole
}

export interface UserAuth {
  id: UserId
  avatar: UserAvatar
  firstName: UserFirstName
  lastName: UserLastName
  role: UserRole
}

export interface UserItem {
  id: UserId
  avatar: UserAvatar
  firstName: UserFirstName
  lastName: UserLastName
}
