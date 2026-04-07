import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: "Password must contain at least one special character",
    }),
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
