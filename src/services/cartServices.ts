"use server";

import { ShippingDetails } from "@/store/cart";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const saveShippingAddress = async (
  data: ShippingDetails,
  userId: string
) => {
  try {
    await prisma.shippingAddress.upsert({
      where: {
        id: data.id || "",
      },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        code: data.code,
        country: data.country,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      create: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        code: data.code,
        country: data.country,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    revalidatePath("/checkouts/information");
    revalidatePath("/shipping-address");

    return {
      message: "Shipping details saved successfully",
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: null,
      error: "Error in saving shipping details",
    };
  }
};

export const getShippingAddress = async (userId: string) => {
  try {
    if (!userId) return { addresses: [], error: null };
    const addresses = await prisma.shippingAddress.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        address: true,
        city: true,
        code: true,
        country: true,
        state: true,
      },
    });

    return { addresses, error: null };
  } catch (error) {
    console.log(error);
    return { addresses: [], error: "Error in fetching shipping details" };
  }
};
