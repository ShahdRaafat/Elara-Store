"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signInAction } from "@/app/_lib/actions";
import GoogleLogin from "./GoogleLogin";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    try {
      setError(null);
      await signInAction(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error in signing in");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <GoogleLogin />

      <p className="text-center text-sm mt-6 text-gray-600">
        Don&#39;t have an account?{" "}
        <Link
          href="/signup"
          className="text-brand-500 font-bold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
