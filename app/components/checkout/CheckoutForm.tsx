"use client";
import { useForm } from "react-hook-form";
import ContactSection from "./ContactSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";

export interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  city: string;
  governorate: string;
  email: string;
  postalCode: string;
  paymentMethod: "card" | "cash";
}

export default function CheckoutForm() {
  const form = useForm<FormInputs>({ mode: "onBlur" });

  function onSubmit(data: FormInputs) {
    console.log("Checkout Data:", data);
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 h-fit">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ContactSection form={form} />
        <DeliverySection form={form} />
        <PaymentSection form={form} />

        <button
          disabled={form.formState.isSubmitting}
          className="w-full mt-6 bg-brand-500 text-white py-3 rounded-lg font-semibold hover:bg-brand-600 transition"
        >
          {form.formState.isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
