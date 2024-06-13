import OrderHistory from "@/components/pages/orders/OrderHistory";
import { fetchUserOrders } from "@/services/orderServices";
import { auth } from "@/utils/auth/auth";
import { Suspense } from "react";

export default async function OrderPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const session = await auth();
  const { data, totalPages, error } = await fetchUserOrders(
    session?.user.id!,
    1,
    1
  );

  return (
    <Suspense>
      <div className="sm:px-6 py-6 px-3 min-h-screen">
        <OrderHistory
          userId={session?.user.id!}
          InitialOrders={data}
          InitialTotalPages={totalPages}
          search={searchParams}
        />
      </div>
    </Suspense>
  );
}
