"use client";

import { OrderWithProductDetails } from "@/types/OrderTypes";
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import { Session } from "next-auth";

interface OrderHistoryProps {
  orders: OrderWithProductDetails[];
}
const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <>
      {orders.length === 0 ? (
        <div className="text-5xl font-bold min-h-screen flex justify-center items-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="flex gap-4 xl:justify-between justify-center items-center flex-wrap">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  );
};
export default OrderHistory;
