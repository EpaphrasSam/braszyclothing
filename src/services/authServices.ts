"use server";

import {
  encryptOTP,
  generateOTP,
  sendOTP,
  storeOTP,
  validateOTP,
} from "@/utils/email";

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
