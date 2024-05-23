"use server";

import { signIn, signOut } from "@/utils/auth/auth";
import {
  encryptOTP,
  generateOTP,
  sendOTP,
  storeOTP,
  validateOTP,
} from "@/utils/email";
import { AuthError } from "next-auth";
import prisma from "@/utils/prisma";

export const checkIfEmailExistsAction = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw Error("Email already exists");
    }
    return false;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const sendOtpAction = async (email: string) => {
  try {
    const otp = generateOTP();
    const encryptedOtp = encryptOTP(otp, email);
    await storeOTP(encryptedOtp, email);

    await sendOTP(otp, email);
    return { message: "OTP sent successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyOtpAction = async (otp: string, email: string) => {
  try {
    const isValid = await validateOTP(otp, email);
    if (!isValid) {
      throw Error("Invalid OTP");
    }
    return { message: "OTP verified successfully" };
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const loginAction = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error(error.cause?.err?.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const logoutAction = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
