import { LoaderFunction, redirect } from "react-router-dom"

import { AnyAction, Dispatch } from "@reduxjs/toolkit"

import { store } from "../../store"

import { setIsAuth, setTokens, setUserAuth } from "../../store/auth/authSlice"

import { AuthTokensResponse } from "../../features/authentication/models"

import { getUserAuthByAccessToken } from "../../services/user.service"
import {
  refreshAuthTokens,
  verifyToken,
} from "../../features/authentication/services"

const rejectAuthentication = (dispatch: Dispatch<AnyAction>): Response => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")

  dispatch(setTokens({ accessToken: null, refreshToken: null }))
  dispatch(setIsAuth(false))

  return redirect("/auth/login")
}

export const isAuthenticated: LoaderFunction = async () => {
  const { isAuth, accessToken, refreshToken } = store.getState().auth
  const dispatch = store.dispatch

  if (!isAuth && accessToken === null) return rejectAuthentication(dispatch)

  let validAccessToken: string = accessToken!

  try {
    await verifyToken(accessToken)
  } catch (e) {
    if (refreshToken === null) return rejectAuthentication(dispatch)

    let newTokens: AuthTokensResponse

    try {
      newTokens = await refreshAuthTokens(refreshToken)

      localStorage.setItem("accessToken", newTokens.accessToken)
      localStorage.setItem("refreshToken", newTokens.refreshToken)
    } catch (e) {
      return rejectAuthentication(dispatch)
    }

    validAccessToken = newTokens.accessToken
  }

  try {
    const user = await getUserAuthByAccessToken(validAccessToken)
    dispatch(setUserAuth(user))
  } catch (e) {
    return rejectAuthentication(dispatch)
  }

  dispatch(setTokens({ accessToken: validAccessToken, refreshToken }))
  dispatch(setIsAuth(true))

  return null
}
