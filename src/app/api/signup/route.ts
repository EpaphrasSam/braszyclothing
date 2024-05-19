import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;
    if (!name || !email || !password) {
      return new NextResponse("Missing fields", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
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
