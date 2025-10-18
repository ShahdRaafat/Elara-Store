// app/ordersuccess/page.tsx - Alternative without redirect
import { redirect } from "next/navigation";
import { getOrder } from "../_lib/data-services";
import { OrderItem } from "../types/order";
import Image from "next/image";
import Link from "next/link";
import { createOrderFromStripeSession } from "../_lib/stripeAction";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string; session_id?: string };
}) {
  let order = null;

  // If coming from Stripe, create order first
  if (searchParams.session_id) {
    try {
      const createdOrder = await createOrderFromStripeSession(
        searchParams.session_id
      );
      order = await getOrder(createdOrder.id);
      console.log(order);
    } catch (error) {
      console.error("Payment error:", error);
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold text-red-600">
            ❌ Payment Error
          </h1>
          <p className="text-gray-600">
            There was an issue processing your payment
          </p>
          <Link href="/checkout">
            <button className="mt-4 px-6 py-2 bg-brand-600 text-white rounded-lg">
              Back to Checkout
            </button>
          </Link>
        </div>
      );
    }
  }
  // If coming with orderId, fetch the order
  else if (searchParams.orderId) {
    order = await getOrder(searchParams.orderId);
  }

  // No order found
  if (!order) {
    redirect("/");
  }

  // Display order (works for both Cash and Card)
  return (
    <div className="max-w-3xl mx-auto py-10 text-center">
      <h1 className="text-3xl font-semibold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase, <strong>{order.first_name}</strong>! Your
        order <strong>#{order.id}</strong> is now <em>{order.status}</em>.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <h2 className="text-lg font-semibold mb-4">📋 Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {order.order_items.map((item: OrderItem) => (
            <li key={item.id} className="py-3 flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src={item.products?.image_url || "/placeholder.png"}
                  alt={item.products?.name}
                  className="absolute rounded-md object-cover"
                  fill
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.products?.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × {item.price} EGP
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>{order.total} EGP</span>
        </div>
      </div>

      <Link href="/">
        <button className="mt-8 px-6 py-2 bg-brand-600 text-white rounded-lg">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
