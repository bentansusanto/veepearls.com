'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL as string,
    credentials: 'include',
    prepareHeaders: headers => {
      const token = Cookies.get('session_veepearl')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
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
      transformResponse: (response: any) => response?.message ?? response,
    }),
    verifyAccount: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/verify_account',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response?.message ?? response,
    }),
    verifyOtp: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/verify_otp',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const token = data
          if (token) {
            const expires = new Date()
            expires.setHours(expires.getHours() + 1)
            Cookies.set('session_veepearl', token, {
              path: '/',
              secure: true,
              sameSite: 'none',
              expires,
            })
          }
        } catch {}
      },
      transformResponse: (response: any) => response?.data ?? response,
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/refresh_token',
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: '/auth/getUser',
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
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi
