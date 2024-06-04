import StatisticsCards from "@/components/pages/admin/dashboard/StatisticsCards";
import OrdersTable from "@/components/pages/admin/orders/OrdersTable";
import TopProducts from "@/components/pages/admin/orders/TopProducts";
import { getOrders, getStats, getTopProducts } from "@/services/adminServices";
import { Divider } from "@nextui-org/react";
import React from "react";

export default async function AdminDashboard() {
  const { stats, error: statsError } = await getStats();
  const { products, error: productsError } = await getTopProducts();
  const { orders, error: ordersError } = await getOrders(true);

  const filteredProducts = products?.map((product) => ({
    ...product,
    quantity: product.quantity ?? 0,
  }));

  return (
    <div className="sm:p-6 p-3">
      <p className="text-2xl font-bold">Dashboard</p>
      <Divider className="my-4" />
      <StatisticsCards stats={stats!} />
      <div className="mt-8 flex xl:flex-row flex-col gap-4">
        <div className="flex-grow">
          <OrdersTable orders={orders} isRecentOnly={true} />
        </div>
        <div className="xl:w-[300px] w-full">
          <TopProducts topProducts={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
