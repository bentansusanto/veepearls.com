import * as Yup from "yup";

export const InitialRegisValue = {
  name: "",
  email: "",
  password: "",
};

export const validationRegisSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
});


export const InitialLoginValue = {
  email: "",
  password: "",
};
export const validationLoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
   .min(6, "Password must be at least 8 characters")
   .required("Password is required"),
})

export const initialVerifyAccountValue = {
  otpCode: "",
  email: "",
};

export const validationVerifyAccountSchema = Yup.object({
  otpCode: Yup.string()
    .required("OTP code is required")
    .min(6, "OTP code must be 6 digits")
    .max(6, "OTP code must be 6 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
})

export const initialVerifyOtpValue = {
  otpCode: "",
};

export const validationVerifyOtpSchema = Yup.object({
  otpCode: Yup.string()
   .required("OTP code is required")
   .min(6, "OTP code must be 6 digits")
   .max(6, "OTP code must be 6 digits")
})
