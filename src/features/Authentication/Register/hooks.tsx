"use client";

import { useFormik } from "formik";
import { RegisterSchema, RegisterFormValues } from "./schema";
import { useRegisterMutation } from "@/store/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegisterForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const router = useRouter();
  const [register, { error, isSuccess }] = useRegisterMutation();

  const validate = (values: RegisterFormValues) => {
    const result = RegisterSchema.safeParse(values);
    if (result.success) return {};
    
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0];
      if (path && typeof path === "string" && !errors[path]) {
        errors[path] = issue.message;
      }
    });
    return errors;
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await register(values).unwrap();
        localStorage.setItem('registered_email', values.email);
        resetForm();
        setOpenSuccess(true);
        setTimeout(() => {
          setOpenSuccess(false);
          router.push("/login");
        }, 2000);
      } catch (err: any) {
        console.error("Registration failed:", err?.data || err);
      }
    },
  });

  return {
    formik,
    openSuccess,
    setOpenSuccess,
    error,
    isSuccess,
  };
};
