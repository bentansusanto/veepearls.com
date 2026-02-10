'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const cartApi = createApi({
  reducerPath: 'cartApi',
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
  tagTypes: ['Cart'],
  endpoints: builder => ({
    getCart: builder.query<any[], void>({
      query: () => '/find_cart',
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: result =>
        result
          ? [
              ...result.map((item: any) => ({ type: 'Cart' as const, id: item.id })),
              { type: 'Cart', id: 'LIST' },
            ]
          : [{ type: 'Cart', id: 'LIST' }],
    }),
    addCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: body => ({
        url: '/add_cart',
        method: 'POST',
        body,
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    updateCart: builder.mutation<any, { cartId: string; quantity: number }>({
      query: ({ cartId, quantity }) => ({
        url: `/update_product_cart/${cartId}`,
        method: 'PUT',
        body: { quantity },
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: (result, error, arg) => [
        { type: 'Cart', id: arg.cartId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),
    removeCart: builder.mutation<any, string>({
      query: cartId => ({
        url: `/remove_product_cart/${cartId}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => res?.data ?? res,
      invalidatesTags: (result, error, arg) => [
        { type: 'Cart', id: arg },
        { type: 'Cart', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetCartQuery, useAddCartMutation, useUpdateCartMutation, useRemoveCartMutation } =
  cartApi
