import axios from "axios";
import { NextResponse } from "next/server";

const token = process.env.UNIVERSAL_AUTH_TOKEN as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { country } = body;

    const response = await axios.get(
      `https://www.universal-tutorial.com/api/states/${country}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error: any) {
    // console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
