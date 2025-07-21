'use client'
import React from 'react'
import FormRegister from './FormRegister'

const RegisterPage = () => {
  return (
    <div className='px-5 mb-20'>
    <div className='mt-5 space-y-8'>
        <div className='space-y-3'>
            <h1 className='text-lg'>Create Account</h1>
            <p className='text-gray-400 text-sm max-w-xs'>Create your account to get started with us</p>
        </div>
        <FormRegister/>
    </div>
</div>
  )
}

export default RegisterPage