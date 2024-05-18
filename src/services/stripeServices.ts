"use server";

import { calculateStripeFee } from "@/helpers/feeCalculators";
import { stripe } from "@/utils/stripe";

export const createPaymentIntent = async (amt: number) => {
  try {
    if (amt === undefined) return;

    const fee = calculateStripeFee(amt);
    const netAmount = amt + fee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(netAmount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        fee: fee.toFixed(2),
        net_amount: netAmount.toFixed(2),
      },
    });

    const paymentIntentObject = {
      amount: parseFloat(amt.toFixed(2)),
      clientSecret: paymentIntent.client_secret,
      fee: parseFloat(fee.toFixed(2)),
      netAmount: parseFloat(netAmount.toFixed(2)),
    };

    return paymentIntentObject;
  } catch (error: any) {
    throw new Error(error);
  }
};
