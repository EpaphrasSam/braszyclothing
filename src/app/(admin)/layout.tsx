import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminHeader from "@/components/layout/AdminHeader";

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
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
