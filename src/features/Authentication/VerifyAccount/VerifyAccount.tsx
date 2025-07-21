'use client'
import React from 'react'
import FormVerifyAccount from './FormVerifyAccount'

const VerifyAccountPage = () => {
  return (
    <div className='px-5 mb-20'>
            <div className='mt-5 space-y-8'>
                <div className='space-y-3'>
                    <h1 className='text-lg'>Verify Account</h1>
                    <p className='text-gray-400 text-sm max-w-xs'>please enter your otp code to verify your account</p>
                </div>
                <FormVerifyAccount/>
            </div>
    </div>
  )
}

export default VerifyAccountPage