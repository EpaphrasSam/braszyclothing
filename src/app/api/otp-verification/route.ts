import { NextResponse } from "next/server";
import { verifyOtpAction } from "@/services/authServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    const validatedOTP = await verifyOtpAction(otp, email);

    if (!validatedOTP) {
      return new NextResponse("Invalid OTP", { status: 400 });
    }

    return new NextResponse("OTP verified", { status: 200 });
  } catch (error: any) {
    switch (error.message) {
      case "Invalid OTP":
        return new NextResponse("Invalid OTP", { status: 400 });
      default:
        return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
