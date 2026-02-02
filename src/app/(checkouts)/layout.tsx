import CheckoutHeader from "@/components/layout/CheckoutHeader";
import OrderAccordion from "@/components/pages/checkout/OrderAccordion";
import OrderSummary from "@/components/pages/checkout/OrderSummary";
import getSession from "@/utils/auth/getSession";
import { Divider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default async function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <main className="flex h-screen lg:overflow-hidden">
      <div className="flex flex-col lg:w-[70%] h-full w-full py-5 sm:px-5 px-2">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              width={150}
              height={150}
              alt="Logo"
              className="w-auto h-auto object-cover object-center pb-3 transition ease-in-out duration-300 hover:scale-110"
              priority
            />
          </Link>
          <OrderAccordion />
          {!session && (
            <div className="flex items-center gap-2 break-all p-2 sm:w-max w-full my-2 bg-[#D4D4D866] text-center rounded-full mx-4 max-sm:text-sm">
              <FiAlertTriangle size={20} color="red" />
              You are currently checking out as a guest, kindly log in to save
              your details
            </div>
          )}
          <CheckoutHeader />
          <Divider className="mb-6 mt-4" />
        </div>

        <SessionProvider session={session}>
          <div className="overflow-y-auto flex-grow h-full scrollbar-thin">
            {children}
          </div>
        </SessionProvider>
      </div>

      <div className="max-lg:hidden w-[30%]">
        <OrderSummary />
      </div>
    </main>
  );
}
