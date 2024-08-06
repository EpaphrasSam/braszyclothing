import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { getUserLocation, getExchangeRates } from "@/services/otherApiServices";
import { getCurrencyByCountry } from "@/helpers/currencyConverter";

export const metadata: Metadata = {
  title: "Braszy Clothing",
  description: "Your one stop for all your fashion needs",
  keywords: "fashion, clothing, braszy, online store",
  alternates: {
    canonical: "https://www.braszyclothing.com",
  },
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userCountry = await getUserLocation();
  const exchangeRates = await getExchangeRates();
  const userCurrency = getCurrencyByCountry(userCountry);

  // console.log(userCountry);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer initialCurrency={userCurrency} exchangeRates={exchangeRates} />
      </div>
    </div>
  );
}
