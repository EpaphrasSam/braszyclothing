"use server";

import { calculateStripeFee } from "@/helpers/feeCalculators";
import { ShippingDetails } from "@/store/cart";
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";

export const createPaymentIntent = async (
  amt: number,
  shippingDetails: ShippingDetails,
  email?: string
) => {
  try {
    if (amt === undefined) return;

    const fee = calculateStripeFee(amt);
    const netAmount = amt + fee;

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(netAmount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        fee: fee.toFixed(2),
        net_amount: netAmount.toFixed(2),
        shippingDetails: JSON.stringify(shippingDetails),
      },
      setup_future_usage: "off_session",
    };

    if (email) {
      const customer = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customer && customer.data && customer.data.length > 0) {
        paymentIntentParams.customer = customer.data[0].id;
      }
    }

    const paymentIntent =
      await stripe.paymentIntents.create(paymentIntentParams);

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

export const savePaymentMethod = async (
  paymentMethodId: string,
  email: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const customersResponse = await stripe.customers.list({ email });

    let customer: Stripe.Customer;

    if (customersResponse.data.length === 0) {
      const newCustomer = await stripe.customers.create({
        email,
      });
      customer = newCustomer;
    } else {
      customer = customersResponse.data[0];
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });

    const isPaymentMethodAttached = paymentMethods.data.some(
      (method) => method.id === paymentMethodId
    );

    if (isPaymentMethodAttached) {
      return {
        success: true,
        message: "Payment method already attached to the customer",
      };
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return { success: true, message: "Payment method saved" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getPaymentMethod = async (email: string) => {
  try {
    const customerList = await stripe.customers.list({ email });
    if (customerList.data.length === 0) {
      return { success: false, error: "Customer not found" };
    }

    const customer = customerList.data[0];
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
    });

    if (paymentMethods.data.length === 0) {
      return { success: false, error: "No payment methods found" };
    }

    return { success: true, paymentMethods: paymentMethods.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
