import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      {
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  return NextResponse.json({ message: "Success Logout" }, { status: 200 });
}
