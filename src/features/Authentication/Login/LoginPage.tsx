'use client'
import React from 'react'
import FormLogin from './FormLogin'

const LoginPage = () => {
  return (
    <div className='px-5 mb-20'>
            <div className='mt-5 space-y-8'>
                <div className='space-y-3'>
                    <h1 className='text-lg'>Sign In</h1>
                    <p className='text-gray-400 text-sm max-w-xs'>please enter your email 
                        and password to access your account</p>
                </div>
                <FormLogin/>
            </div>
    </div>
  )
}

export default LoginPage