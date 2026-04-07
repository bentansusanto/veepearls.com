'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useRegisterForm } from './hooks'

const FormRegister = () => {
  const { formik, openSuccess, setOpenSuccess, error, isSuccess } = useRegisterForm()

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3 space-y-2">
        <input
          type="text"
          {...formik.getFieldProps('name')}
          placeholder="Full name"
          className="bg-transparent text-xs w-full border border-gray-200
         dark:border-gray-600 rounded-sm p-3"
        />
        {formik.touched.name && formik.errors.name && (
          <div className=" text-red-500 italic text-xs">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-3 space-y-2">
        <input
          type="email"
          {...formik.getFieldProps('email')}
          placeholder="Email address"
          className="bg-transparent text-xs w-full border border-gray-200
         dark:border-gray-600 rounded-sm p-3"
        />
        {formik.touched.email && formik.errors.email && (
          <div className=" text-red-500 italic text-xs">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-3 space-y-2">
        <input
          type="password"
          {...formik.getFieldProps('password')}
          placeholder="Password"
          className="bg-transparent text-xs w-full border border-gray-200
         dark:border-gray-600 rounded-sm p-3"
        />
        {formik.touched.password && formik.errors.password && (
          <div className=" text-red-500 italic text-xs">{formik.errors.password}</div>
        )}
      </div>
      <div className="mb-3 space-y-3">
        <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <Button className="w-full" type="submit">
            {formik.isSubmitting ? 'Loading...' : 'Register'}
          </Button>
          <AlertDialogContent className="px-5">
            {isSuccess && (
              <AlertDialogHeader>
                <span className="w-20 h-20 p-3 rounded-full mx-auto mb-5 flex justify-center animate-pulse bg-green-200">
                  <span className="w-14 h-14 p-2.5 rounded-full flex mx-auto justify-center bg-green-400 text-white">
                    <Check width={40} height={40} strokeWidth={3} />
                  </span>
                </span>
                <AlertDialogTitle>Success create account</AlertDialogTitle>
                <AlertDialogDescription>
                  Please check your email to verify your account
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}
            <AlertDialogFooter>
              {/* <AlertDialogAction>Verify Account</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <p className="text-sm text-gray-500 text-center">
          I already have an account,{' '}
          <Link prefetch={true} href={'/login'} className="text-[#A78E57] font-me">
            Login
          </Link>
        </p>
        {error && (
          <p
            className="text-red-500 text-center text-sm bg-red-50
        w-full py-2 rounded-sm"
          >
            Error create account
          </p>
        )}
      </div>
    </form>
  )
}

export default FormRegister
