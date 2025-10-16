"use client";
import { UseFormReturn } from "react-hook-form";
import { FormInputs } from "./CheckoutForm";

export default function PaymentSection({
  form,
}: {
  form: UseFormReturn<FormInputs>;
}) {
  const { register } = form;

  return (
    <section className="space-y-3">
      <h3 className="font-semibold text-lg mb-2">Payment</h3>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:border-brand-500">
          <input
            type="radio"
            value="card"
            {...register("paymentMethod", { required: true })}
          />
          <span>Pay with Card</span>
        </label>
        <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:border-brand-500">
          <input
            type="radio"
            value="cash"
            {...register("paymentMethod", { required: true })}
          />
          <span>Cash on Delivery</span>
        </label>
      </div>
    </section>
  );
}
