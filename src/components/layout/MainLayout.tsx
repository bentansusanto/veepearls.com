'use client'
import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRefreshTokenMutation } from '@/store/services/auth.service'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [refreshToken] = useRefreshTokenMutation()

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
        .unwrap()
        .catch(() => {})
    }, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [refreshToken])

  return (
    <div className="mx-auto lg:max-w-md bg-gray-100 dark:bg-transparent h-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
