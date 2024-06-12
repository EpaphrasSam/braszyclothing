import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { verifyOtpAction } from "@/services/authServices";
import { CustomError } from "@/utils/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, otp } = body;

    if (!name || !email || !password || !otp) {
      throw new CustomError("Missing fields", 400);
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

    throw new CustomError("Invalid OTP", 400);
  } catch (error: any) {
    switch (error.code) {
      case "P2002":
        throw new CustomError("Email already exists", 400);
      default:
        throw new CustomError(
          error.message || "Internal Server Error",
          error.code || 500
        );
    }
  }
}
