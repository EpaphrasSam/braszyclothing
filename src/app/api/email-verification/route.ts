import { sendOtpAction } from "@/services/authServices";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const response = await sendOtpAction(email);

    return new NextResponse(response.message, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
