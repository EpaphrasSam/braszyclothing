import CheckoutHeader from "@/components/layout/CheckoutHeader";
import OrderAccordion from "@/components/pages/checkout/OrderAccordion";
import OrderSummary from "@/components/pages/checkout/OrderSummary";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      {/* <main className="flex h-screen lg:overflow-hidden"> */}
      <div className="lg:w-[70%] w-full py-5 sm:px-5 px-2">
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
        {/* <div className="overflow-y-auto scrollbar-thin">{children}</div> */}
        {children}
      </div>
      <div className="max-lg:hidden w-[30%] sticky top-0">
        <OrderSummary />
      </div>
    </main>
  );
}
