import { sendOtpAction } from "@/services/authServices";
import { sendAdminNotificationEmail } from "@/utils/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // const body = await request.json();
    // const { email } = body;
    // const response = await sendOtpAction(email);

    await sendAdminNotificationEmail("123456789");

    return new NextResponse("Email sent", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
