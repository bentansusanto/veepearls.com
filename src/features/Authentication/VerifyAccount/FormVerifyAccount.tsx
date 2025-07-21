"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  initialVerifyAccountValue,
  validationVerifyAccountSchema,
} from "@/common/validation/AuthValidation";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { VerifyAccount } from "@/common/Fetching/Auth/Auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";

const FormVerifyAccount = () => {
  const { verifyMutation, error, success } = VerifyAccount();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialVerifyAccountValue,
    validationSchema: validationVerifyAccountSchema,
    onSubmit: async (values, { resetForm }) => {
      await verifyMutation.mutateAsync(values);
      resetForm();
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
        router.push("/login");
      }, 1000);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3 space-y-2">
        <input
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email address"
          className="bg-transparent text-xs w-full border border-gray-200
         dark:border-gray-600 rounded-sm p-3"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs italic text-red-500">{formik.errors.email}</p>
        )}
      </div>
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
            {formik.isSubmitting ? "Loading..." : "Verify Account"}
          </Button>
          <AlertDialogContent>
            {success && (
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
          I dont have an account,{" "}
          <Link
            prefetch={true}
            href={"/register"}
            className="text-[#A78E57] font-me"
          >
            Create account
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

export default FormVerifyAccount;
