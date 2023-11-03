import { FC } from "react"

import { Navigate, Outlet } from "react-router-dom"

import { store } from "../../store"

import { UserRole } from "../../models/user.model"

interface Props {
  roles: UserRole[]
}

const HasRole: FC<Props> = ({ roles }) => {
  const userRole = store.getState().auth.user!.role

  if (userRole === UserRole.ADMIN) return <Outlet />

  return roles.includes(userRole) ? <Outlet /> : <Navigate to="/" />
}

export default HasRole
