import { Order } from "@/app/types/order";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

function OrderViewModal({
  order,
  open,
  onClose,
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
}) {
  const orderItems = order.order_items || [];

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <Card className="border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative bg-white shadow-xl">
        <Button
          variant="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </Button>

        <h2 className="text-2xl font-bold text-brand-500 mb-6">
          Order Details
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 font-medium">Order ID</p>
              <p className="font-mono font-semibold text-gray-900 mt-1">
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Customer</p>
              <p className="font-semibold text-gray-900 mt-1">
                {order.first_name} {order.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Date</p>
              <p className="font-semibold text-gray-900 mt-1">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total</p>
              <p className="font-bold text-gray-900 mt-1">
                {order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-brand-500 mb-4">Order Items</h3>
            <div className="space-y-2">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 border border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.products.name}
                    </p>
                    {item.product_variants?.size && (
                      <p className="text-xs text-gray-600">
                        Size: {item.product_variants.size}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      <span className="mr-4">{item.quantity}x</span>
                      <span>{item.price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Order Status
              </label>
              <select className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1">
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Payment Status
              </label>
              <select className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              className="flex-1 px-4 py-3 text-white font-medium rounded-lg transition-colors"
              style={{ backgroundColor: "var(--color-brand-500)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-600)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-500)")
              }
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OrderViewModal;
