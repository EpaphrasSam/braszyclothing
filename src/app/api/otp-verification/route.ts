import { NextResponse } from "next/server";
import { verifyOtpAction } from "@/services/authServices";
import { CustomError } from "@/utils/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    const validatedOTP = await verifyOtpAction(otp, email);

    if (!validatedOTP) {
      throw new CustomError("Invalid OTP", 400);
    }

    return new NextResponse("OTP verified", { status: 200 });
  } catch (error: any) {
    switch (error.message) {
      case "Invalid OTP":
        throw new CustomError("Invalid OTP", 400);
      default:
        throw new CustomError("Internal Server Error", 500);
    }
  }
}
