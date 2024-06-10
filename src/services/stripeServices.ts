"use server";

import { calculateStripeFee } from "@/helpers/feeCalculators";
import { ShippingDetails } from "@/store/cart";
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";

interface PaymentMethodDetails {
  last4: string;
  brand: string;
}

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
      payment_method_types: ["card"],
      amount: Math.round(netAmount * 100),
      currency: "usd",
      metadata: {
        fee: fee.toFixed(2),
        net_amount: netAmount.toFixed(2),
        shippingDetails: JSON.stringify(shippingDetails),
      },
    };

    if (email) {
      const customer = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customer && customer.data && customer.data.length > 0) {
        paymentIntentParams.customer = customer.data[0].id;
        paymentIntentParams.setup_future_usage = "off_session";
      } else {
        const newCustomer = await stripe.customers.create({
          email: email,
        });
        paymentIntentParams.customer = newCustomer.id;
        paymentIntentParams.setup_future_usage = "off_session";
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

export const updatePaymentMethod = async (
  paymentMethodId: string,
  BillingDetails: any
) => {
  try {
    await stripe.paymentMethods.update(paymentMethodId, {
      billing_details: BillingDetails,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPaymentMethodDetails = async (
  paymentIntentId: string
): Promise<PaymentMethodDetails> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const paymentMethodId = paymentIntent.payment_method as string;
    if (!paymentMethodId) {
      throw new Error("Payment method not found");
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    return {
      last4: paymentMethod.card?.last4 || "",
      brand: paymentMethod.card?.brand || "",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createStripeCoupon = async (
  discountRate: number,
  duration: "once" | "repeating" | "forever" = "once",
  durationInMonths?: number,
  expirationDate?: Date,
  maxRedemptions?: number
): Promise<Stripe.Coupon> => {
  try {
    const couponParams: Stripe.CouponCreateParams = {
      percent_off: discountRate,
      duration,
    };

    if (duration === "repeating" && durationInMonths) {
      couponParams.duration_in_months = durationInMonths;
    }

    if (expirationDate) {
      couponParams.redeem_by = Math.floor(expirationDate.getTime() / 1000);
    }

    if (maxRedemptions) {
      couponParams.max_redemptions = maxRedemptions;
    }

    const coupon = await stripe.coupons.create(couponParams);
    return coupon;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const generatePromotionCode = async (
  couponId: string
): Promise<Stripe.PromotionCode> => {
  try {
    const promotionCode = await stripe.promotionCodes.create({
      coupon: couponId,
      max_redemptions: 1,
    });

    return promotionCode;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const validateCoupon = async (couponId: string) => {
  try {
    const coupon = await stripe.coupons.retrieve(couponId);

    const plainCoupon = {
      id: coupon.id,
      object: coupon.object,
      amount_off: coupon.amount_off,
      created: coupon.created,
      currency: coupon.currency,
      duration: coupon.duration,
      duration_in_months: coupon.duration_in_months,
      livemode: coupon.livemode,
      max_redemptions: coupon.max_redemptions,
      metadata: coupon.metadata,
      name: coupon.name,
      percent_off: coupon.percent_off,
      redeem_by: coupon.redeem_by,
      times_redeemed: coupon.times_redeemed,
      valid: coupon.valid,
    };

    return plainCoupon;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const updateCouponValidity = async (couponId: string) => {
  try {
    const coupon = await stripe.coupons.del(couponId);
    return coupon;
  } catch (error: any) {
    throw Error(error.message);
  }
};
