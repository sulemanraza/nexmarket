"use client";
import { PendingButton } from "@/client/components/Buttons/PendingButton";
import { useToast } from "@/client/components/ui/use-toast";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/client/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, {
    message:
      "Password must be at least 8 characters long and contain at least one number",
  }),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const user: any = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (user.error) {
        const error = JSON.parse(user.error);

        if (error.email) {
          form.setError("email", {
            type: "server",
            message: error.email,
          });

          return;
        } else if (error.password) {
          form.setError("password", {
            type: "server",
            message: error.password,
          });

          return;
        }
      }

      // If no error, redirect to home page
      toast({
        title: "Login successful",
        description: "You have been successfully logged in",
        variant: "success",
      });

      return (window.location.href = "/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="w-full lg:w-3/4 space-y-2"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-500">Enter your details below</p>
        <div className="space-y-6 py-8">
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      autoComplete="off"
                      {...field}
                      className="w-full border-0 outline-none focus:border-b-brand border-b-2 h-11  border-gray-300  transition-all duration-300 ease-in-out"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      {...field}
                      className="w-full border-0 outline-none focus:border-b-brand border-b-2 h-11  border-gray-300  transition-all duration-300 ease-in-out"
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 ring-black"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link href="/auth/forgot-password" className="hover:text-brand">
              Forgot Password
            </Link>
          </div>
          <PendingButton labelText="Login" />

          <div className="flex items-center gap-2 justify-center">
            <span>Don&lsquo;t have an account? </span>
            <Link
              href="/auth/signup"
              className="hover:text-brand underline underline-offset-8"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
