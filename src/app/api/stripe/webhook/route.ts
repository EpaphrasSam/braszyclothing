import { stripe } from "@/utils/stripe";
import axios from "axios";
import { NextResponse } from "next/server";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const payload = await request.text();
  const response = JSON.parse(payload);

  const signature = request.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      webhookSecret
    );
    // console.log(
    //   "event",
    //   event?.data?.object?.metadata,
    //   event.data?.object?.payment_method_details
    // );
    // console.log(event);
    // if (event.type === "charge.updated") {
    //   const paymentMethod = event.data.object.payment_method_details;
    //   console.log(paymentMethod);
    // }

    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
