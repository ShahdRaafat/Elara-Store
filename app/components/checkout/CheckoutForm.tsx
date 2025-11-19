"use client";
import { useForm } from "react-hook-form";
import ContactSection from "./ContactSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";
import { useCart } from "@/app/_contexts/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createStripeSession } from "../../_lib/stripeAction";
import { createCashOrder } from "@/app/_lib/actions";

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
  const { cart, clearCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  async function onSubmit(data: FormInputs) {
    try {
      if (data.paymentMethod === "card") {
        // Stripe
        const res = await createStripeSession({
          ...data,
          cart,
          total: totalPrice,
        });
        window.location.href = res.url ?? "";
        return;
      }

      //Cash
      const order = await createCashOrder({
        ...data,
        cart,
        total: totalPrice,
      });
      clearCart();
      router.push(`/ordersuccess?orderId=${order.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 h-fit">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ContactSection form={form} />
        <DeliverySection form={form} />
        <PaymentSection form={form} />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full mt-6"
        >
          {form.formState.isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
}
