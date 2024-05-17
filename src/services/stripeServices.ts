"use server";

import useCartStore from "@/store/cart";
import { stripe } from "@/utils/stripe";

export const createPaymentIntent = async (amt: number) => {
  try {
    if (amt === undefined) return;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amt * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount / 100,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
