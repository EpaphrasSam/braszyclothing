import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Cart = dynamic(() => import("@/components/pages/cart/Cart"), {
  ssr: false,
});

export default async function CartPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Cart />
    </Suspense>
  );
}
