'use client'

import { API_URL } from '@/common/Fetching/ApiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
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
  tagTypes: ['Orders', 'Payment'],
  endpoints: builder => ({
    createPaymentPaypal: builder.mutation<any, { pemesanId: string }>({
      query: ({ pemesanId }) => ({
        url: '/create_order_product_paypal',
        method: 'POST',
        body: { pemesanId },
      }),
      transformResponse: (res: any) => res?.data ?? res,
    }),
    capturePaymentPaypal: builder.mutation<any, string>({
      query: tokenPaypal => ({
        url: `/capture_payment_paypal?token=${tokenPaypal}`,
        method: 'POST',
      }),
      transformResponse: (res: any) => res ?? res,
    }),
    verifyPaymentPaypal: builder.query<any, string>({
      query: tokenPaypal => `/verify_payment_paypal?token=${tokenPaypal}`,
      transformResponse: (res: any) => res?.data ?? res,
    }),
    createPaymentCod: builder.mutation<any, { pemesanId: string }>({
      query: ({ pemesanId }) => ({
        url: '/create_order_product_cod',
        method: 'POST',
        body: { pemesanId },
      }),
      transformResponse: (res: any) => res?.data ?? res,
    }),
    createPaymentCard: builder.mutation<any, { pemesanId: string }>({
      query: ({ pemesanId }) => ({
        url: '/create_order_product_card',
        method: 'POST',
        body: { pemesanId },
      }),
      transformResponse: (data: any) => ({
        clientSecret: data?.data?.clientSecret,
        orderId: data?.data?.id,
        orderCode: data?.data?.order_code,
        amount: data?.data?.amount,
      }),
    }),
    capturePaymentCard: builder.mutation<any, { paymentIntentId: string }>({
      query: ({ paymentIntentId }) => ({
        url: '/capture_payment_card',
        method: 'POST',
        body: { paymentIntentId },
      }),
      transformResponse: (res: any) => res?.data ?? res,
    }),
    findHistoryOrder: builder.query<any[], void>({
      query: () => '/find_history_order',
      transformResponse: (res: any) => res?.data ?? res,
      providesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreatePaymentPaypalMutation,
  useCapturePaymentPaypalMutation,
  useVerifyPaymentPaypalQuery,
  useCreatePaymentCodMutation,
  useCreatePaymentCardMutation,
  useCapturePaymentCardMutation,
  useFindHistoryOrderQuery,
} = paymentApi
