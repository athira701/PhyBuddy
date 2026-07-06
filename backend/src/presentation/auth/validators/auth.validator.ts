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
