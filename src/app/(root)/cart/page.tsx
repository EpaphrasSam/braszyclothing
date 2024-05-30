import Cart from "@/components/pages/cart/Cart";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <Suspense>
      <Cart />
    </Suspense>
  );
}
