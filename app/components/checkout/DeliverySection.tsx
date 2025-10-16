"use client";
import { UseFormReturn } from "react-hook-form";
import { FormInputs } from "./CheckoutForm";
import InputField from "./CheckoutInput";

interface DeliverySectionProps {
  form: UseFormReturn<FormInputs>;
}

function DeliverySection({ form }: DeliverySectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="space-y-4 mb-7">
      <h3 className="font-semibold text-lg mb-2">Delivery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          placeholder="First name"
          register={register("firstName", {
            required: "First name is required",
            minLength: { value: 2, message: "Too short" },
          })}
          error={errors.firstName}
        />
        <InputField
          placeholder="Last name"
          register={register("lastName", {
            required: "Last name is required",
          })}
          error={errors.lastName}
        />
      </div>
      <div>
        <InputField
          placeholder="Address"
          register={register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Enter a valid address" },
          })}
          error={errors.address}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField
          placeholder="City"
          register={register("city", {
            required: "City is required",
          })}
          error={errors.city}
        />
        <InputField
          placeholder="Governorate"
          register={register("governorate", {
            required: "Governorate is required",
          })}
          error={errors.governorate}
        />
        <InputField
          placeholder="Postal code (optional)"
          register={register("postalCode", {
            pattern: {
              value: /^[0-9]{3,10}$/,
              message: "Invalid postal code",
            },
          })}
          error={errors.postalCode}
        />
      </div>
    </section>
  );
}
export default DeliverySection;
