"use server";

import prisma from "@/utils/prisma";
import { client } from "../../sanity/lib/client";
import { stripe } from "@/utils/stripe";

export const getStats = async () => {
  const Orders = await prisma.order.count();
  const Users = await prisma.user.count();
  const Guests = await prisma.guest.count();
  const Sales = await prisma.paymentIntent.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  return {
    Orders,
    Users,
    Guests,
    totalSales: Sales._sum.totalAmount || 0,
  };
};
