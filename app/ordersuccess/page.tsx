import { redirect } from "next/navigation";
import { getOrder } from "../_lib/data-services";
import { OrderItem } from "../types/order";
import Image from "next/image";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams.orderId;
  if (!orderId) redirect("/");

  const order = await getOrder(orderId);

  if (!order) {
    return <div className="text-center py-10">Order not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 text-center">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        🎉 Order placed successfully!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase, {order.first_name}! Your order{" "}
        <strong>#{order.id}</strong> is now <em>{order.status}</em>.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
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

        <div className="mt-6 flex justify-between font-semibold">
          <span>Total</span>
          <span>
            {order.order_items.reduce(
              (sum: number, item: OrderItem) =>
                sum + item.quantity * item.price,
              0
            )}{" "}
            EGP
          </span>
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
