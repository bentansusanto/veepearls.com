'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { RootState } from '../store'

export const pemesanApi = createApi({
  reducerPath: 'pemesanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL as string,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      // 1. Try Redux state (preferred)
      const token = (getState() as RootState).auth.accessToken
      // 2. Fallback to token_mirror cookie
      const cookieToken = Cookies.get('session_token')

      const activeToken = token || cookieToken

      if (activeToken) {
        headers.set('authorization', `Bearer ${activeToken}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Pemesan'],
  endpoints: builder => ({
    getPemesan: builder.query<any[], void>({
      query: () => '/find_all_pemesan',
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: result =>
        result
          ? [
              ...result.map((item: any) => ({ type: 'Pemesan' as const, id: item.id })),
              { type: 'Pemesan', id: 'LIST' },
            ]
          : [{ type: 'Pemesan', id: 'LIST' }],
    }),
    getPemesanById: builder.query<any, string>({
      query: id => `/find_pemesan/${id}`,
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: (result, error, id) => [{ type: 'Pemesan', id }],
    }),
    createPemesan: builder.mutation<any, any>({
      query: body => ({
        url: '/create_pemesan',
        method: 'POST',
        body,
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: [{ type: 'Pemesan', id: 'LIST' }],
    }),
    updatePemesan: builder.mutation<any, { pemesanId: string; data: any }>({
      query: ({ pemesanId, data }) => ({
        url: `/update_pemesan/${pemesanId}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: (result, error, arg) => [
        { type: 'Pemesan', id: arg.pemesanId },
        { type: 'Pemesan', id: 'LIST' },
      ],
    }),
    deletePemesan: builder.mutation<any, string>({
      query: pemesanId => ({
        url: `/delete_pemesan/${pemesanId}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: (result, error, arg) => [
        { type: 'Pemesan', id: arg },
        { type: 'Pemesan', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetPemesanQuery,
  useGetPemesanByIdQuery,
  useCreatePemesanMutation,
  useUpdatePemesanMutation,
  useDeletePemesanMutation,
} = pemesanApi
