import { Order } from "@/app/types/order";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ViewOrder from "./ViewOrder";

function OrdersCards({
  orders,
  statusColors,
  paymentStatusColors,
}: {
  orders: Order[];
  statusColors: Record<string, string>;
  paymentStatusColors: Record<string, string>;
}) {
  return (
    <div className="lg:hidden space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono font-semibold text-gray-900 text-sm">
                  {order.id}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.first_name} {order.last_name}
                </p>
              </div>
              <ViewOrder order={order} />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-600 font-medium">Total</p>
                <p className="font-semibold text-gray-900">
                  {order.total.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Date</p>
                <p className="text-sm text-gray-900">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Badge className={statusColors[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div>
                <Badge className={paymentStatusColors[order.payment_status]}>
                  {order.payment_status.charAt(0).toUpperCase() +
                    order.payment_status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default OrdersCards;
