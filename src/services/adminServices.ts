"use server";

import prisma from "@/utils/prisma";
import { client } from "../../sanity/lib/client";
import { stripe } from "@/utils/stripe";
import { ProductType } from "@/types/SanityTypes";
import { Orders, OrderWithProductDetails, Product } from "@/types/OrderTypes";
import { revalidatePath } from "next/cache";

export const getStats = async () => {
  try {
    const Orders = await prisma.order.count();
    const Users = await prisma.user.count();
    const Guests = await prisma.guest.count();
    const Sales = await prisma.paymentIntent.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    return {
      stats: {
        Orders,
        Users,
        Guests,
        totalSales: Sales._sum.totalAmount || 0,
      },
      error: null,
    };
  } catch (error) {
    return {
      stats: null,
      error,
    };
  }
};

export const getTopProducts = async () => {
  try {
    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const productIds = topProducts.map((item) => item.productId);
    const query = `*[_type == "product" && _id in $productIds]{
      "id": _id,
      name,
      price,
      description,
      inStock,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url,
      "colors": color,
      "sizes": size
    }`;
    const products: ProductType[] = await client.fetch(query, { productIds });

    return {
      products: products.map((product) => ({
        ...product,
        quantity: topProducts.find((item) => item.productId === product.id)
          ?._sum.quantity,
      })),
      error: null,
    };
  } catch (error) {
    return {
      products: [],
      error,
    };
  }
};

export const getOrders = async (
  recentOnly: boolean = false
): Promise<{ orders: Orders[]; error: any }> => {
  try {
    const orders = await prisma.order.findMany({
      take: recentOnly ? 10 : undefined,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        guest: {
          select: {
            id: true,
            email: true,
          },
        },
        shippingAddress: true,
        items: true,
        paymentIntent: true,
      },
    });

    const productIds = Array.from(
      new Set(
        orders.flatMap((order) => order.items.map((item) => item.productId))
      )
    );

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

    const mergedProducts = orders.flatMap((order) =>
      order.items.map((item) => {
        const product = productMap[item.productId];
        if (product) {
          return {
            ...product,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          };
        } else {
          return product;
        }
      })
    );

    const filteredOrders: Orders[] = orders.map((order) => {
      const { user, guest } = order;
      const filteredProducts = order.items
        .map((item) => {
          const product = productMap[item.productId];
          return {
            ...product,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          };
        })
        .filter((product) => product != null);

      const orderDetails: any = {
        id: order.id,
        orderID: order.orderID,
        shippingAddress: order.shippingAddress,
        products: filteredProducts,
        items: order.items,
        paymentIntent: order.paymentIntent,
        shippingMethod: order.shippingMethod,
        shippingStatus: order.shippingStatus,
        createdAt: order.createdAt,
      };

      if (user) {
        orderDetails.userId = user.id;
        orderDetails.userName = user.name;
        orderDetails.isUser = true;
      } else if (guest) {
        orderDetails.guestId = guest.id;
        orderDetails.guestEmail = guest.email;
        orderDetails.isGuest = true;
      }

      return orderDetails;
    });

    return {
      orders: filteredOrders,
      error: null,
    };
  } catch (error) {
    return {
      orders: [],
      error,
    };
  }
};

export const updateOrderStatus = async (orderId: string, action: string) => {
  try {
    let status: string;

    switch (action) {
      case "Ship":
        status = "Shipping";
        break;
      case "Complete":
        status = "Completed";
        break;
      case "Cancel":
        status = "Canceled";
        break;
      default:
        status = "Pending";
        break;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { shippingStatus: status },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
