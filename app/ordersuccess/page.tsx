import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrder } from "../_lib/data-services";
import OrderItemRow from "../components/account/OrderItemRow";
import OrderSuccessClient from "../components/checkout/OrderSuccessClient";
import { OrderItem } from "../types/order";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string; session_id?: string };
}) {
  // If coming from Stripe, need to process on client side to access localStorage
  if (searchParams.session_id) {
    return <OrderSuccessClient sessionId={searchParams.session_id} />;
  }

  // If coming with orderId (Cash on Delivery), fetch the order
  let order = null;
  if (searchParams.orderId) {
    order = await getOrder(searchParams.orderId);
  }

  // No order found
  if (!order) {
    redirect("/");
  }

  // Display order for Cash on Delivery
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
            <OrderItemRow item={item} key={item.id} />
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
