"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import {
  useVerifyAccountMutation,
  useResendVerificationMutation,
} from "@/store/services/auth.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Mail, RefreshCcw, LogIn, AlertCircle } from "lucide-react";

type ViewState = "form" | "success" | "error";

const FormVerifyAccount = () => {
  const [verifyAccount, { isLoading: isVerifying }] = useVerifyAccountMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();
  const [viewState, setViewState] = useState<ViewState>("form");
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenFromUrl = searchParams.get("verify_token");
  const emailFromUrl = searchParams.get("email");

  const formik = useFormik({
    initialValues: {
      email: emailFromUrl || "",
      token: tokenFromUrl || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await verifyAccount({
          email: values.email,
          token: values.token
        }).unwrap();
        setViewState("success");
      } catch (err) {
        console.error("Verification failed:", err);
        setViewState("error");
      }
    },
  });

  const handleResend = async () => {
    const registeredEmail = localStorage.getItem('registered_email') || emailFromUrl || "";

    if (!registeredEmail) {
      alert("Email not found. Please try registering again.");
      return;
    }

    try {
      await resendVerification({ email: registeredEmail }).unwrap();
      alert("A new verification link has been sent to your email.");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to resend verification link");
    }
  };

  // Auto-submit if token and email are present in URL
  useEffect(() => {
    if (tokenFromUrl && emailFromUrl && viewState === "form" && !hasAutoSubmitted) {
      setHasAutoSubmitted(true);
      formik.handleSubmit();
    }
  }, [tokenFromUrl, emailFromUrl, viewState, hasAutoSubmitted, formik]);

  // Success View
  if (viewState === "success") {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center border border-green-500/20 shadow-2xl shadow-green-500/5">
           <Check size={64} strokeWidth={3} className="md:scale-125" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white tracking-tight">Verify Success</h1>
          <p className="text-gray-400 max-w-sm mx-auto text-xs">
            Your luxury account has been successfully verified. Welcome to the exclusive world of Veepearl.
          </p>
        </div>

        <Button
          onClick={() => router.push("/login")}
          className="bg-[#A78E57] hover:bg-[#8e784a] text-white px-10 py-3 text-sm rounded-full flex items-center gap-2 shadow-xl shadow-[#A78E57]/20 transition-all active:scale-95"
        >
          <LogIn size={20} />
          Proceed to Login
        </Button>
      </div>
    );
  }

  // Error View
  if (viewState === "error") {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border border-red-500/20 shadow-2xl shadow-red-500/5">
           <AlertCircle size={64} strokeWidth={3} className="md:scale-125" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">Verify Error</h1>
          <p className="text-gray-400 max-w-sm mx-auto">
            We couldn't verify your account. The link may have expired or is no longer valid.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleResend}
            disabled={isResending}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-6 rounded-full flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCcw size={20} className={isResending ? "animate-spin" : ""} />
            {isResending ? "Resending..." : "Resend Verify"}
          </Button>

          <Link href="/login">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // IDLE / LOADING VIEW (Before auto-submit or if no params)
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in duration-700">
      {!tokenFromUrl || !emailFromUrl ? (
        <>
          <div className="w-20 h-20 bg-amber-500/10 text-amber-500 p-4 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/5">
             <AlertCircle size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Access Denied</h1>
            <p className="text-gray-400 max-w-sm mx-auto">
              This page requires a valid verification link sent to your email.
            </p>
          </div>
          <div className="flex flex-col gap-4">
             <Button
                onClick={handleResend}
                disabled={isResending}
                className="bg-[#A78E57] hover:bg-[#8e784a] text-white px-8 py-3 rounded-xl transition-all"
              >
                Resend Link
              </Button>
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                 Back to Login
              </Link>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default FormVerifyAccount;
