"use server";

import { calculateStripeFee } from "@/helpers/feeCalculators";
import { ShippingDetails } from "@/store/cart";
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";

interface PaymentMethodDetails {
  last4?: string;
  brand?: string;
  type: string;
  name?: string;
}

export const createPaymentIntent = async (
  amt: number,
  shippingDetails: ShippingDetails,
  email?: string,
  referralId?: string
) => {
  try {
    if (amt === undefined) return;

    const fee = calculateStripeFee(amt);
    const netAmount = amt + fee;

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      // payment_method_types: ["card", "afterpay_clearpay", "klarna", "affirm"],
      automatic_payment_methods: { enabled: true },
      amount: Math.round(netAmount * 100),
      currency: "cad",
      metadata: {
        fee: fee.toFixed(2),
        net_amount: netAmount.toFixed(2),
        shippingDetails: JSON.stringify(shippingDetails),
        ...(referralId && { promotekit_referral: referralId }),
      },
    };

    if (email) {
      const customer = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customer && customer.data && customer.data.length > 0) {
        paymentIntentParams.customer = customer.data[0].id;
        paymentIntentParams.payment_method_options = {
          card: {
            setup_future_usage: "off_session",
          },
        };
      } else {
        const newCustomer = await stripe.customers.create({
          email: email,
        });
        paymentIntentParams.customer = newCustomer.id;
        paymentIntentParams.payment_method_options = {
          card: {
            setup_future_usage: "off_session",
          },
        };
      }
    }

    const paymentIntent =
      await stripe.paymentIntents.create(paymentIntentParams);

    const paymentIntentObject = {
      amount: parseFloat(amt.toFixed(2)),
      clientSecret: paymentIntent.client_secret,
      fee: parseFloat(fee.toFixed(2)),
      netAmount: parseFloat(netAmount.toFixed(2)),
      paymentIntentId: paymentIntent.id,
    };

    return paymentIntentObject;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const cancelPaymentIntent = async (
  paymentIntentId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await stripe.paymentIntents.cancel(paymentIntentId);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const savePaymentMethod = async (
  paymentMethodId: string,
  email: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (paymentMethod.type !== "card") {
      return {
        success: false,
        message: "Only card payment methods can be saved",
      };
    }

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

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return { success: true, message: "Card payment method saved" };
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

export const updatePaymentMethod = async (
  paymentMethodId: string,
  BillingDetails: any
) => {
  try {
    await stripe.paymentMethods.update(paymentMethodId, {
      billing_details: BillingDetails,
    });
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getPaymentMethodDetails = async (
  paymentIntentId: string
): Promise<PaymentMethodDetails | { error: string }> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const paymentMethodId = paymentIntent.payment_method as string;
    if (!paymentMethodId) {
      throw new Error("Payment method not found");
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    const details: PaymentMethodDetails = {
      type: paymentMethod.type,
    };

    if (paymentMethod.type === "card") {
      details.last4 = paymentMethod.card?.last4 || "";
      details.brand = paymentMethod.card?.brand || "";
    } else {
      details.name =
        paymentMethod.type.charAt(0).toUpperCase() +
        paymentMethod.type.slice(1);
    }

    return details;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const checkIfCouponExists = async (code: string) => {
  try {
    const coupon = await stripe.coupons.retrieve(code);
    if (!coupon) {
      throw new Error("Coupon code does not exist");
    }
    return coupon;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const generatePromotionCode = async (
  couponId: string
): Promise<Stripe.PromotionCode | { error: string }> => {
  try {
    const promotionCode = await stripe.promotionCodes.create({
      coupon: couponId,
      max_redemptions: 1,
    });

    return promotionCode;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const validatePromotionCode = async (code: string) => {
  try {
    const promoCode = await stripe.promotionCodes.list({
      code: code,
    });
    const promotionCode = await stripe.promotionCodes.retrieve(
      promoCode.data[0].id
    );

    return {
      valid: promotionCode.active,
      amount_off: promotionCode.coupon.amount_off || null,
      percent_off: promotionCode.coupon.percent_off || null,
      code: promotionCode.code,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const inValidatePromotionCodes = async (codes: string[]) => {
  try {
    codes.forEach(async (code) => {
      const promoCode = await stripe.promotionCodes.list({
        code: code,
      });
      await stripe.promotionCodes.update(promoCode.data[0].id, {
        active: false,
      });
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const checkPaymentIntentStatus = async (
  paymentIntentId: string
): Promise<{ paymentIntent: any; error?: string }> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const plainPaymentIntent = JSON.parse(JSON.stringify(paymentIntent));
    return { paymentIntent: plainPaymentIntent };
  } catch (error: any) {
    console.error("Error checking payment intent status:", error);
    return { paymentIntent: null, error: error.message };
  }
};
