"use client";
import { useLoginMutation } from "@/store/services/auth.service";
import {
  InitialLoginValue,
  validationLoginSchema,
} from "@/common/validation/AuthValidation";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

const FormLogin = () => {
  const [login, { error, isSuccess }] = useLoginMutation();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: InitialLoginValue,
    validationSchema: validationLoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await login(values).unwrap();
        if (result && result.access_token) {
          dispatch(
            setCredentials({
              user: {
                id: result.id,
                name: result.name,
                email: result.email,
                role: result.role,
              },
              access_token: result.access_token,
            })
          );
        }
        resetForm();
        setOpenSuccess(true);
        setTimeout(() => {
          setOpenSuccess(false);
          router.push("/");
        }, 2000);
      } catch (err: any) {
        console.error("Login failed:", err);
      }
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
        <input
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="bg-transparent text-xs w-full border border-gray-200
           dark:border-gray-600 rounded-sm p-3"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs italic text-red-500">
            {formik.errors.password}
          </p>
        )}
      </div>
      <div className="mb-3 space-y-2">
        <Link
          prefetch={true}
          href={"/forgot-password"}
          className="text-xs text-[#A78E57]"
        >
          Forgot Password
        </Link>
      </div>
      <div className="mb-3 space-y-3">
        <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <Button className="w-full">
            {formik.isSubmitting ? "Loading..." : "Login Now"}
          </Button>
          <AlertDialogContent className="px-5">
            {isSuccess && (
              <AlertDialogHeader>
                <span className="w-20 h-20 p-3 rounded-full mx-auto mb-5 flex justify-center animate-pulse bg-green-200">
                  <span className="w-14 h-14 p-2.5 rounded-full flex mx-auto justify-center bg-green-400 text-white">
                    <Check width={40} height={40} strokeWidth={3} />
                  </span>
                </span>
                <AlertDialogTitle>Login Successful</AlertDialogTitle>
                <AlertDialogDescription>
                  Welcome back to Veepearl!
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}
            <AlertDialogFooter>
              {/* <AlertDialogAction>Verify Account</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-sm text-gray-500 text-center">
          I don't have an account,{" "}
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
            Login failed please try again
          </p>
        )}
      </div>
    </form>
  );
};

export default FormLogin;
