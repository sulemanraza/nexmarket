"use server";

import User from "@/server/models/User";
import dbConnect from "@/server/utils/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Define the registration schema using zod
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters long and contain at least one number"
    ),
});

// Define the state and return type for the registration action
interface RegistrationState {
  status?: number;
  message?: string;
  errors?: Record<string, string[]>;
}

// Define the registration action
export async function registerAction(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  console.log({ data: formData });

  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate a delay for the registration process
  const { name, email, password } = validatedFields.data;

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: ["Email is already registered"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "user",
    emailVerified: false,
  });

  await newUser.save();

  return {
    status: 201,
    message: "User created successfully",
  };
}
