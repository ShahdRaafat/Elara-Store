"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signUp, signInWithGoogle } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>();

  const onSubmit = async (data: SignUpInputs) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    await signUp(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName", { required: "Full name is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brand-500"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}

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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          })}
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

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
