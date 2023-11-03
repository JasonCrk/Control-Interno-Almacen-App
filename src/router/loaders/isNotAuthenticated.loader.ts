import { LoaderFunction, redirect } from "react-router-dom"

import { store } from "../../store"

export const isNotAuthenticated: LoaderFunction = () => {
  const isAuth = store.getState().auth.isAuth

  if (isAuth) return redirect("/")

  return null
}
