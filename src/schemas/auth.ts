import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string(),
});

export const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});
