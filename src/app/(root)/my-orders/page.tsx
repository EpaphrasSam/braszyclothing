import OrderHistory from "@/components/pages/orders/OrderHistory";
import { fetchUserOrders } from "@/services/orderServices";
import { auth } from "@/utils/auth/auth";

export default async function OrderPage() {
  const session = await auth();
  const { data, error } = await fetchUserOrders(session?.user.id!);

  return (
    <div className="p-6 min-h-screen">
      <OrderHistory orders={data} />
    </div>
  );
}
