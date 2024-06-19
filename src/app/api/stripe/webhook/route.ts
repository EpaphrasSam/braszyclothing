import { stripe } from "@/utils/stripe";
import axios from "axios";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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

    // if (event.type === "charge.succeeded") {
    //   const charge = event.data.object as Stripe.Charge;
    //   const metadata: any = charge.metadata;

    //   const promotekitReferral = metadata.promotekit_referral;
    //   const shippingDetails = JSON.parse(metadata.shippingDetails);

    //   if (promotekitReferral) {
    //     window.promotekit.refer(shippingDetails.email);
    //   }
    // }

    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
