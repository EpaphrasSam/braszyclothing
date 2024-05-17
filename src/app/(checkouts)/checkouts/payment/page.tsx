import PaymentForms from "@/components/pages/checkout/PaymentForms";
import { Suspense } from "react";

export default async function PaymentPage() {
  return (
    <div className="flex justify-center items-center">
      <PaymentForms />
    </div>
  );
}
