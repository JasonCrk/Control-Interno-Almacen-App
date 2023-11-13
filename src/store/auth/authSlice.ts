import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { UserAuth } from "../../models/user.model"

interface SliceState {
  isAuth: boolean
  accessToken: string | null
  refreshToken: string | null
  user: UserAuth | null
}

const initialState: SliceState = {
  isAuth: false,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
}

type PayloadSetUserAuth = SliceState["user"]
type PayloadSetTokens = Pick<SliceState, "accessToken" | "refreshToken">

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<PayloadSetTokens>) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    setIsAuth: (state, { payload: isAuth }: PayloadAction<boolean>) => {
      state.isAuth = isAuth
    },
    setUserAuth: (state, { payload }: PayloadAction<PayloadSetUserAuth>) => {
      state.user = payload
    },
    setLogoutAuth: state => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuth = false
    },
  },
})

export const { setTokens, setIsAuth, setUserAuth, setLogoutAuth } =
  authSlice.actions

export default authSlice.reducer
