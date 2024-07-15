"use client";
import { Button } from "@/client/components/ui/button";
import { GoogleIcon } from "@/client/icon/GoogleIcon";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { registerAction } from "./RegisterAction";
import { PendingButton } from "@/client/components/Buttons/PendingButton";
import { useToast } from "@/client/components/ui/use-toast";

const initialState = {
  message: "",
};

export const SignUpForm = () => {
  const [state, formAction] = useFormState(registerAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state) {
      if (state.status === 201) {
        toast({
          title: "Account created successfully",
          description: "You can now login",
          variant: "success",
        });

        return window.location.replace("/auth/login");
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="w-full lg:w-3/4 space-y-2">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <p className="text-gray-500">Enter your details below</p>
      <div className="space-y-6 py-8">
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="off"
            className={`w-full border-0 outline-none focus:border-b-brand  border-b-2 h-11  border-gray-300  transition-all duration-300 ease-in-out`}
          />

          {state.errors?.name && (
            <span className="text-red-500 text-xs">{state.errors.name}</span>
          )}
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="off"
            className="w-full border-0 outline-none focus:border-b-brand border-b-2 h-11  border-gray-300  transition-all duration-300 ease-in-out"
          />
          {state.errors?.email && (
            <span className="text-red-500 text-xs">{state.errors.email}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full border-0 outline-none focus:border-b-brand border-b-2 h-11  border-gray-300  transition-all duration-300 ease-in-out"
          />
          {state.errors?.password && (
            <span className="text-red-500 text-xs">
              {state.errors.password}
            </span>
          )}
        </div>
        <div className="flex flex-col  gap-4">
          <PendingButton labelText="Create Account" />

          <Button
            variant={"outline"}
            className="w-full flex items-center gap-4 min-w-[143px] h-14"
          >
            <GoogleIcon /> <span>Sign up with Google</span>
          </Button>

          <div className="flex items-center gap-2 justify-center">
            <span>Already have account?</span>
            <Link
              href="/auth/login"
              className="hover:text-brand underline underline-offset-8"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
