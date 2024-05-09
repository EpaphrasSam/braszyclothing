import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import AdminHeader from "@/components/layout/AdminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Braszy Clothing | Admin",
  description: "Admin portal for braszy clothing",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Providers>
          <AdminHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
