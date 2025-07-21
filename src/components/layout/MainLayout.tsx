'use client'
import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { RefreshToken } from '@/common/Fetching/Auth/Auth'

const MainLayout = ({children}:{children:ReactNode}) => {
  const {refreshTokenMutation} = RefreshToken()
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenMutation.mutate();
    }, 60 * 60 * 1000); // Refresh every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [refreshTokenMutation]);
  return (
    <div className='mx-auto lg:max-w-md bg-gray-100 dark:bg-transparent h-full'>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default MainLayout