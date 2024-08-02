import { NextResponse } from "next/server";
import { generateInvoicePDF } from "@/components/pages/invoice/generateInvoicePDF";
import prisma from "@/utils/prisma";
import { client } from "../../../../sanity/lib/client";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId || typeof orderId !== "string") {
      return new NextResponse("Invalid order ID", { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        shippingAddress: true,
        user: true,
        guest: true,
        paymentIntent: true,
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Fetch product details for each item from Sanity
    const cartItems = await Promise.all(
      order.items.map(async (item) => {
        const product = await client.fetch(
          `*[_type == "product" && _id == $productId][0]{
            _id,
            name,
            price,
            oldPrice,
            description,
            "imageUrls": images[].asset->url,
            color,
            size,
            inStock,
            newRelease
          }`,
          { productId: item.productId }
        );

        if (!product) {
          throw new Error(`Product not found for ID: ${item.productId}`);
        }

        return {
          ...product,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };
      })
    );

    // Determine email and contact from user or guest
    const email = order.user?.email || order.guest?.email || "";
    const contact = order.user?.contact || order.guest?.contact || "";

    const shippingDetails = {
      firstName: order.shippingAddress.firstName,
      lastName: order.shippingAddress.lastName,
      address: order.shippingAddress.address,
      country: order.shippingAddress.country,
      state: order.shippingAddress.state,
      code: order.shippingAddress.code,
      city: order.shippingAddress.city,
      shippingMethod: order.shippingMethod,
      email,
      contact,
    };

    const invoiceProps = {
      orderID: order.orderID,
      cartItems,
      shippingDetails,
      totalAmount: order.paymentIntent?.totalAmount || 0,
      discount: order.paymentIntent?.discount || 0,
      fee: order.paymentIntent?.fee || 0,
      shippingFee: order.paymentIntent?.shippingFee || 0,
      netAmount: order.paymentIntent?.netAmount || 0,
      createdAt: order.createdAt,
    };

    const pdfBuffer = await generateInvoicePDF(invoiceProps);

    const response = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        orderID: order.orderID,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice_${order.orderID}.pdf`,
      },
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Failed to generate invoice", { status: 500 });
  }
}
