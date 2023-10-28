import { LoaderFunction, redirect } from "react-router-dom"

import { store } from "../../store"

export const isAuthenticated: LoaderFunction = () => {
  const isAuth = store.getState().auth.isAuth

  if (!isAuth) return redirect("/auth/login")

  return null
}
