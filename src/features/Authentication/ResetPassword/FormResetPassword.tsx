"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useResetPasswordMutation } from "@/store/services/auth.service";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

const FormResetPasswordContent = () => {
  const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();
  const [openSuccess, setOpenSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("verify_token");
  const email = searchParams.get("email");

  const formik = useFormik({
    initialValues: {
      email: email || "",
      token: token || "",
      password: "",
      retryPassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      retryPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword(values).unwrap();
        setOpenSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        console.error("Reset password failed:", err);
      }
    },
  });

  if (isSuccess || openSuccess) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Password Reset Successful</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm">
            Your password has been reset. You'll be redirected to the login page shortly.
          </p>
        </div>
        <Link href="/login" className="text-[#A78E57] font-medium hover:underline flex items-center gap-2 text-sm mt-4">
          Go to Login
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (!token || !email) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-4">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Invalid Reset Link</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm">
            The link you followed is invalid or has expired. Please request a new password reset link.
          </p>
        </div>
        <Link href="/forgot-password" className="bg-[#A78E57] hover:bg-[#8e784a] text-white px-8 py-3 rounded-xl transition-all">
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Set New Password</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Resetting password for <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-[#A78E57] transition-all"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              {...formik.getFieldProps("retryPassword")}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-[#A78E57] transition-all"
            />
          </div>
          {formik.touched.retryPassword && formik.errors.retryPassword && (
            <p className="text-xs text-red-500">{formik.errors.retryPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#A78E57] hover:bg-[#8e784a] text-white py-6 text-base font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          {isLoading ? "Updating Password..." : "Reset Password"}
        </Button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-xs text-red-600 dark:text-red-400 text-center">
            Failed to reset password. The link may be expired.
          </p>
        </div>
      )}
    </div>
  );
};

const FormResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading reset flow...</div>}>
      <FormResetPasswordContent />
    </Suspense>
  );
};

export default FormResetPassword;
