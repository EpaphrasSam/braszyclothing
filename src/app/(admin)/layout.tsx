import type { Metadata } from "next";
import AdminHeader from "@/components/layout/AdminHeader";
import Sidebar from "@/components/pages/admin/AdminDrawer";

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
    <>
      <AdminHeader />
      {children}
    </>
  );
}
