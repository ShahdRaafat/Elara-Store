"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signUpAction } from "@/app/_lib/actions";
import GoogleLogin from "./GoogleLogin";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>();

  const password = watch("password");

  const onSubmit = async (data: SignUpInputs) => {
    try {
      setError(null);
      await signUpAction(data.email, data.password, data.fullName);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error in creating account"
      );
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords don't match",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <GoogleLogin />

      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-500 font-bold hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
