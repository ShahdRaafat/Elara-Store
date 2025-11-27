import { getOrders } from "@/app/_lib/data-services";
import OrdersCards from "@/app/components/admin/OrdersManagement/OrdersCards";
import { OrdersTable } from "@/app/components/admin/OrdersManagement/OrdersTable";
import Pagination from "@/app/components/Pagination";

async function page({ searchParams }: { searchParams?: { page?: string } }) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const statusColors = {
    processing: "bg-amber-100 text-amber-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
  };

  const paymentStatusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-orange-100 text-orange-800",
  };

  const { orders, totalPages } = await getOrders({ page });
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
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
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
