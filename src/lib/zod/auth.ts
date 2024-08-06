import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, { message: "Min length of username should be 3" })
    .max(100, {
      message: "Max length of username should be less than or equal to 100",
    }),
  password: z
    .string()
    .min(6, { message: "password length should be greater than 6" }),
});

export const verifyOtpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const ForgotPasswordInputSchema = z.object({ email: z.string() });
export const VerifyAccountActionSchema = z.object({
  username: z.string(),
  pin: z.string().min(6),
});
export const NewPasswordSchema = z.object({
  new_password: z.string().min(6, {
    message: "Length of new Password should be 6 or more than 6 digits",
  }),
  confirm_password: z.string().min(6, {
    message: "Length of new Password should be 6 or more than 6 digits",
  }),
});
export type verifyOtpType = z.infer<typeof verifyOtpSchema>;
export type signupType = z.infer<typeof signupSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInputSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
