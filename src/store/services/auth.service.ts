'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { RootState } from '../store'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL as string,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      // 1. Try Redux state (preferred)
      const token = (getState() as RootState).auth.accessToken
      // 2. Fallback to token_mirror cookie
      const cookieToken = Cookies.get('token_mirror')

      const activeToken = token || cookieToken

      if (activeToken) {
        headers.set('authorization', `Bearer ${activeToken}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  endpoints: builder => ({
    register: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    login: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    verifyAccount: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/verify_account',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: body => ({
        url: '/auth/forgot_password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    resetPassword: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/reset_password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    resendVerification: builder.mutation<any, { email: string }>({
      query: body => ({
        url: '/auth/resend_verification',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/refresh_token',
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: {},
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyAccountMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi
