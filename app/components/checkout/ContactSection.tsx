"use client";
import { UseFormReturn } from "react-hook-form";
import { FormInputs } from "./CheckoutForm";
import InputField from "../InputField";

interface ContactSectionProps {
  form: UseFormReturn<FormInputs>;
}

function ContactSection({ form }: ContactSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="space-y-3 mb-7">
      <h3 className="font-semibold text-lg mb-4">Contact</h3>
      <InputField
        placeholder="Email"
        type="email"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
        error={errors.email}
      />
      <InputField
        placeholder="Phone"
        type="tel"
        register={register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Enter a valid phone number",
          },
        })}
        error={errors.phone}
      />
    </section>
  );
}
export default ContactSection;
