import OrdersTable from "@/components/pages/admin/orders/OrdersTable";
import { getOrders } from "@/services/adminServices";
import { Divider } from "@heroui/react";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { orders, error } = await getOrders();

  return (
    <div className="sm:p-6 p-3">
      <div className="flex items-center gap-2 text-2xl font-bold">
        Orders
        <span className="text-xs font-semibold mt-2 text-zinc-600">
          {orders.length} Orders found
        </span>
      </div>
      <Divider className="my-4" />
      <OrdersTable orders={orders} isRecentOnly={false} />
    </div>
  );
}
