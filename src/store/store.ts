'use client'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/auth.service'
import { cartApi } from './services/cart.service'
import { paymentApi } from './services/payment.service'
import { productApi } from './services/product.service'
import { pemesanApi } from './services/pemesan.service'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [pemesanApi.reducerPath]: pemesanApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      paymentApi.middleware,
      pemesanApi.middleware
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
