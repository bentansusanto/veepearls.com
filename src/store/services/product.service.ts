'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { RootState } from '../store'

export const productApi = createApi({
  reducerPath: 'productApi',
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
  tagTypes: ['Products', 'JewelTypes'],
  endpoints: builder => ({
    getProducts: builder.query<any[], void>({
      query: () => '/products',
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: result =>
        result
          ? [
              ...result.map((p: any) => ({ type: 'Products' as const, id: p.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<any, string>({
      query: id => `/products/${id}`,
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: result =>
        result ? [{ type: 'Products', id: result.id }] : [{ type: 'Products', id: 'DETAIL' }],
    }),
    getJewelTypes: builder.query<any[], void>({
      query: () => '/jeweltypes',
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: result =>
        result ? [{ type: 'JewelTypes', id: 'LIST' }] : [{ type: 'JewelTypes', id: 'LIST' }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery, useGetJewelTypesQuery } = productApi
