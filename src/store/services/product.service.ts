'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL as string,
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
