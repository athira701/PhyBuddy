import { z } from "zod";
import { UserRole } from "../../../shared/enums/user-role.enum";

export const signupValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().trim().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  role: z.enum([UserRole.STUDENT, UserRole.TUTOR]),
});

export const verifyOtpValidator = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  otp: z
    .string()
    .trim()
    .length(4, "OTP must contain exactly 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const resendOtpValidator = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});