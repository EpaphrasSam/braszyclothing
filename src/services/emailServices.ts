"use server";
import prisma from "@/utils/prisma";
import { checkIfCouponExists, generatePromotionCode } from "./stripeServices";
import { addAudienceEmail, sendCouponEmail } from "@/utils/email";

const couponCode = process.env.COUPON_CODE as string;

export const addEmailToNewsletter = async (email: string) => {
  try {
    const userExists = await prisma.newsletter.findUnique({
      where: { email },
    });
    if (userExists) {
      throw Error("Email already exists");
    }

    const couponExists = await checkIfCouponExists(couponCode);
    if ("error" in couponExists) throw new Error(couponExists.error);

    await prisma.newsletter.create({
      data: {
        email,
      },
    });
    await addAudienceEmail(email);
    const promoCode = await generatePromotionCode(couponCode);
    if ("error" in promoCode) throw new Error(promoCode.error);
    await sendCouponEmail(email, promoCode.code);
    return { message: "Coupon sent to email" };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
