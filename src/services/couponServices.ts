"use server";
import prisma from "@/utils/prisma";
import { createStripeCoupon } from "./stripeServices";
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
    const coupon = await createStripeCoupon(10, "once");
    await sendCouponEmail(email, coupon.id);
    return { message: "Coupon sent to email" };
  } catch (error: any) {
    throw Error(error.message);
  }
};
