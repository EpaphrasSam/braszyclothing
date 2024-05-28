"use server";

import { generateOrderID } from "@/helpers/generators";
import { PaymentIntentType, ShippingDetails } from "@/store/cart";
import { ProductType } from "@/types/SanityTypes";
import prisma from "@/utils/prisma";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { client } from "../../sanity/lib/client";
import { OrderWithProductDetails, Product } from "@/types/OrderTypes";

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

export const createOrder = async (
  cartItems: (ProductType & { color: string; size: string })[],
  shippingAddress: ShippingDetails,
  paymentIntentId: string,
  paymentIntent: PaymentIntentType | null,
  discount: number,
  session?: Session | null
) => {
  try {
    const { email, contact, id, shippingMethod, ...data } = shippingAddress;
    if (!email || !contact) {
      throw new Error("Email and contact are required");
    }

    let guestId: string | undefined;
    let shippingAddressId: string;
    let userId: string | undefined;

    const orderID = generateOrderID(8);

    await prisma.$transaction(async (prisma) => {
      if (!session) {
        const guest = await prisma.guest.create({
          data: { contact, email },
        });
        guestId = guest.id;
        shippingAddressId = (
          await prisma.shippingAddress.create({
            data: {
              ...data,
              guest: { connect: { id: guest.id } },
            },
          })
        ).id;
      } else {
        userId = session?.user.id!;
        shippingAddressId = (
          await prisma.shippingAddress.upsert({
            where: { id: id || "" },
            update: { ...data, user: { connect: { id: userId } } },
            create: { ...data, user: { connect: { id: userId } } },
          })
        ).id;
      }

      const order = await prisma.order.create({
        data: {
          orderID,
          shippingAddressId,
          shippingMethod: shippingMethod!,
          guestId,
          userId,
          paymentIntent: {
            create: {
              paymentIntentId,
              totalAmount: paymentIntent?.amount!,
              netAmount: paymentIntent?.netAmount!,
              fee: paymentIntent?.fee!,
              discount,
            },
          },
        },
      });

      await prisma.orderItem.createMany({
        data: cartItems.map((item) => ({
          quantity: item.quantity!,
          productId: item.id,
          color: item.color,
          size: item.size,
          orderId: order.id,
        })),
      });
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      error: error.message || "Error in creating order",
    };
  }
};

export const fetchUserOrders = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        shippingAddress: true,
        items: true,
        paymentIntent: true,
      },
    });

    if (!orders.length) {
      throw new Error("No orders found for this user");
    }

    const productIds = [
      ...new Set(
        orders.flatMap((order) => order.items.map((item) => item.productId))
      ),
    ];

    const query = `*[_type == "product" && _id in $productIds]{
      "id": _id,
      name,
      price,
      "slug": slug.current,
      "images": images[].asset->url,
    }`;

    const products: Product[] = await client.fetch(query, { productIds });

    const productMap = products.reduce(
      (acc: { [key: string]: Product }, product: Product) => {
        acc[product.id] = product;
        return acc;
      },
      {}
    );

    const ordersWithProductDetails: OrderWithProductDetails[] = orders.map(
      (order) => ({
        ...order,
        items: order.items.map((item) => ({
          ...item,
          product: productMap[item.productId],
        })),
      })
    );

    return {
      data: ordersWithProductDetails,
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      data: [],
      error: error.message,
    };
  }
};
