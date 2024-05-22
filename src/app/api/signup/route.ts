import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { verifyOtpAction } from "@/services/authServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, otp } = body;

    if (!name || !email || !password || !otp) {
      return new NextResponse("Missing fields", {
        status: 400,
      });
    }
    const validate = await verifyOtpAction(otp, email);

    if (validate.message) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      return new NextResponse(JSON.stringify(user), { status: 200 });
    }

    return new NextResponse("Invalid OTP", { status: 400 });
  } catch (error: any) {
    switch (error.code) {
      case "P2002":
        return new NextResponse("Email already exists", {
          status: 400,
        });
      default:
        return new NextResponse(error.message || "Internal Server Error", {
          status: error.code || 500,
        });
    }
  }
}
