"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useVerifyOtpMutation } from "@/store/services/auth.service";
import {
  initialVerifyOtpValue,
  validationVerifyOtpSchema,
} from "@/common/validation/AuthValidation";
import Link from "next/link";
import { Check } from "lucide-react";

const FormVerifyOtp = () => {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [verifyOtp, { error, isSuccess }] = useVerifyOtpMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialVerifyOtpValue,
    validationSchema: validationVerifyOtpSchema,
    onSubmit: async (values, { resetForm }) => {
      await verifyOtp(values);
      resetForm();
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
        router.push("/");
      }, 2000);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3 space-y-2">
        <InputOTP
          name="otpCode"
          value={formik.values.otpCode}
          onChange={(e) => formik.setFieldValue("otpCode", e)}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="mx-auto">
            <InputOTPSlot index={0} className="p-7 text-xl uppercase" />
            <InputOTPSlot index={1} className="p-7 text-xl uppercase" />
            <InputOTPSlot index={2} className="p-7 text-xl uppercase" />
            <InputOTPSlot index={3} className="p-7 text-xl uppercase" />
            <InputOTPSlot index={4} className="p-7 text-xl uppercase" />
            <InputOTPSlot index={5} className="p-7 text-xl uppercase" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="mb-3 space-y-3">
        <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <Button className="w-full">
            {formik.isSubmitting ? "Loading..." : "Verify Otp"}
          </Button>
          <AlertDialogContent>
            {isSuccess && (
              <AlertDialogHeader>
                <span className="w-20 h-20 p-3 rounded-full mx-auto mb-5 flex justify-center animate-pulse bg-green-200">
                  <span className="w-14 h-14 p-2.5 rounded-full flex mx-auto justify-center bg-green-400 text-white">
                    <Check width={40} height={40} strokeWidth={3} />
                  </span>
                </span>
                <AlertDialogTitle>Success verify otp</AlertDialogTitle>
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
          I dont have an account,{" "}
          <Link
            prefetch={true}
            href={"/verify-otp"}
            className="text-[#A78E57] font-me"
          >
            Generate new otp
          </Link>
        </p>
        {error && (
          <p
            className="text-red-500 text-center text-sm bg-red-50 
      w-full py-2 rounded-sm"
          >
            Error verify account, please try again
          </p>
        )}
      </div>
    </form>
  );
};

export default FormVerifyOtp;
