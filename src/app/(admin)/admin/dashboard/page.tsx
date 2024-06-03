import StatisticsCards from "@/components/pages/admin/dashboard/StatisticsCards";
import { getStats } from "@/services/adminServices";
import { Divider } from "@nextui-org/react";
import React from "react";

export default async function AdminDashboard() {
  const stats = await getStats();
  return (
    <div className="p-6">
      <p className="text-2xl font-bold">Dashboard</p>
      <Divider className="my-4" />
      <StatisticsCards stats={stats} />
    </div>
  );
}
