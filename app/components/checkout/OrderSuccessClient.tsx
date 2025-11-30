"use client";

import { useCart } from "@/app/_contexts/CartContext";
import { createOrderFromStripeSession } from "@/app/_lib/stripeAction";
import { Order, OrderItem } from "@/app/types/order";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import OrderItemRow from "../account/OrderItemRow";

export default function OrderSuccessClient({
  sessionId,
}: {
  sessionId: string;
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { clearCart } = useCart();

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    async function processOrder() {
      try {
        processedRef.current = true;

        const fullOrder = await createOrderFromStripeSession(sessionId);

        setOrder(fullOrder);
        clearCart();
        setLoading(false);
      } catch (err) {
        console.error("Payment error:", err);
        setError("There was an issue processing your payment");
        setLoading(false);
        processedRef.current = false;
      }
    }

    processOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold text-red-600">
          ❌ Payment Error
        </h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/checkout">
          <button className="mt-4 px-6 py-2 bg-brand-600 text-white rounded-lg">
            Back to Checkout
          </button>
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Order not found</p>
      </div>
    );
  }

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
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item: OrderItem) => (
              <OrderItemRow item={item} key={item.id} />
            ))
          ) : (
            <li className="py-4 text-gray-500">No items found</li>
          )}
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
