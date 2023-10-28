import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { UserAuth } from "../../models/auth.model"

interface SliceState {
  isAuth: boolean
  accessToken: string | null
  refreshToken: string | null
  user: UserAuth | null
}

const initialState: SliceState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,
}

type PayloadSetTokens = { accessToken: string; refreshToken: string }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<PayloadSetTokens>) => {
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    setIsAuth: state => {
      state.isAuth = true
    },
  },
})

export const { setTokens, setIsAuth } = authSlice.actions

export default authSlice.reducer
