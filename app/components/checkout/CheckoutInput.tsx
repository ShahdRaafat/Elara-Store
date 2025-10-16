"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function InputField({
  label,
  placeholder,
  type = "text",
  register,
  error,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
export default InputField;
