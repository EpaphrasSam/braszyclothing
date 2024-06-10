"use server";
import prisma from "@/utils/prisma";
import { createStripeCoupon, generatePromotionCode } from "./stripeServices";
import { sendCouponEmail } from "@/utils/email";

export const addEmailToNewsletter = async (email: string) => {
  try {
    const userExists = await prisma.newsletter.findUnique({
      where: { email },
    });
    if (userExists) {
      throw Error("Email already exists");
    }
    await prisma.newsletter.create({
      data: {
        email,
      },
    });

    const promoCode = await generatePromotionCode("xRryNPp9");
    await sendCouponEmail(email, promoCode.code);
    return { message: "Coupon sent to email" };
  } catch (error: any) {
    throw Error(error.message);
  }
};
