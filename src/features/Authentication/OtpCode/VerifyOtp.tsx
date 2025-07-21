'use client'
import React from 'react'
import FormVerifyOtp from './FormVerifyOtp'

const VerifyOtpPage = () => {
  return (
    <div className='px-5 mb-20'>
    <div className='mt-5 space-y-8'>
        <div className='space-y-3'>
            <h1 className='text-lg'>Verify Otp</h1>
            <p className='text-gray-400 text-sm max-w-xs'>please enter your otp code to verify your account</p>
        </div>
        <FormVerifyOtp/>
    </div>
</div>
  )
}

export default VerifyOtpPage