"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  city: string;
  governorate: string;
  email: string;
  postalCode?: string;
}

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(
    null
  );

  const onSubmit = (data: FormInputs) => {
    console.log({
      ...data,
      paymentMethod,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto"
      >
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Delivery */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery</h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-7">
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <input
            className="w-full mb-7 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}

          <div className="grid sm:grid-cols-3 gap-4 mb-7">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              type="text"
              placeholder="Governorate"
              {...register("governorate", {
                required: "Governorate is required",
              })}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              type="text"
              placeholder="Postal code (optional)"
              {...register("postalCode")}
            />
          </div>

          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            type="text"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-lg font-semibold mb-7">Payment</h3>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex-1 border rounded-lg py-2 ${
                paymentMethod === "cash"
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-300"
              }`}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex-1 border rounded-lg py-2 ${
                paymentMethod === "card"
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-300"
              }`}
            >
              Pay with Card
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 text-white py-3 rounded-lg hover:bg-brand-600 transition"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
