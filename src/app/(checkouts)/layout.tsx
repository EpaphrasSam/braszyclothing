import CheckoutHeader from "@/components/layout/CheckoutHeader";
import OrderAccordion from "@/components/pages/checkout/OrderAccordion";
import OrderSummary from "@/components/pages/checkout/OrderSummary";
import { Divider } from "@nextui-org/react";
import Image from "next/image";

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <main className="flex">
    <main className="flex h-screen lg:overflow-hidden">
      <div className="flex flex-col lg:w-[70%] h-full w-full py-5 sm:px-5 px-2">
        <div>
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="w-auto h-auto"
            priority
          />
          <OrderAccordion />
          <CheckoutHeader />
          <Divider className="mb-6 mt-4" />
        </div>

        <div className="overflow-y-auto flex-grow h-full scrollbar-thin">
          {children}
        </div>
      </div>

      <div className="max-lg:hidden w-[30%]">
        <OrderSummary />
      </div>
    </main>
  );
}
