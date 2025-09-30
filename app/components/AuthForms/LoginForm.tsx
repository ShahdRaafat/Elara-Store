"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, signInWithGoogle } from "@/app/_lib/actions";
import GoogleLogin from "./GoogleLogin";
import { Button } from "@/components/ui/button";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await signIn(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

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
        Don’t have an account?{" "}
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
