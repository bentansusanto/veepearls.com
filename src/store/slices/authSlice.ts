import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; access_token: string }>
    ) => {
      const { user, access_token } = action.payload
      state.user = user
      state.accessToken = access_token

      // Mirror token for Middleware visibility in cross-site development
      Cookies.set('session_token', access_token, {
        expires: 7,
        sameSite: 'lax',
        secure: false, // development compatible
      })
    },
    logout: state => {
      state.user = null
      state.accessToken = null
      Cookies.remove('session_token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.accessToken
