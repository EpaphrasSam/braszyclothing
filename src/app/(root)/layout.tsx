import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export const metadata: Metadata = {
  title: "Braszy Clothing",
  description: "Your one stop for all your fashion needs",
  keywords: "fashion, clothing, braszy, online store",
  alternates: {
    canonical: "https://www.braszyclothing.com",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
