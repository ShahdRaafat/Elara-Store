import { getOrders } from "@/app/_lib/data-services";
import OrdersCards from "@/app/components/admin/OrdersManagement/OrdersCards";
import { OrdersTable } from "@/app/components/admin/OrdersManagement/OrdersTable";

async function page() {
  const statusColors = {
    processing: "bg-amber-100 text-amber-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  const paymentStatusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-orange-100 text-orange-800",
  };

  const orders = await getOrders();
  console.log(orders);
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Orders Management
        </h1>
        <p className="mt-2 mb-6 text-sm md:text-base text-gray-600">
          View and manage customer orders
        </p>
        <OrdersTable
          orders={orders}
          statusColors={statusColors}
          paymentStatusColors={paymentStatusColors}
        />
        <OrdersCards
          orders={orders}
          statusColors={statusColors}
          paymentStatusColors={paymentStatusColors}
        />
      </div>
    </div>
  );
}

export default page;
