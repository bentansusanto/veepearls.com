"use client";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "@/store/services/auth.service";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const FormForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [isSent, setIsSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPassword(values).unwrap();
        setIsSent(true);
      } catch (err: any) {
        alert(err?.data?.message || "Failed to send reset link");
      }
    },
  });

  if (isSent) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm">
            We've sent a password reset link to <strong>{formik.values.email}</strong>.
          </p>
        </div>
        <Link href="/login" className="text-[#A78E57] font-medium hover:underline flex items-center gap-2 text-sm mt-4">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Forgot Password?</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="example@mail.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-[#A78E57] transition-all"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#A78E57] hover:bg-[#8e784a] text-white py-6 text-base font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          {isLoading ? "Sending link..." : "Send Reset Link"}
        </Button>

        <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
          <Link href="/login" className="text-sm text-gray-500 hover:text-[#A78E57] transition-colors flex items-center justify-center gap-2">
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormForgotPassword;
