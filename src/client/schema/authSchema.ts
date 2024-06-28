import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string({
      message:
        "Password must be at least 8 characters long and contain at least one number",
    })
    .min(8),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string({
      message:
        "Password must be at least 8 characters long and contain at least one number",
    })
    .min(8),
});
