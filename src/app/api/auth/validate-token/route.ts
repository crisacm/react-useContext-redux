import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      {
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Not are token" }, { status: 400 });
  } else {
    if (token === "this_token_not_are_a_real_one") {
      return NextResponse.json(
        {
          message: "Token valid",
          user: {
            id: 1,
            name: "Not real user",
            email: "test@demo.com",
            token: "this_token_not_are_a_real_one",
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Token not valid" }, { status: 401 });
    }
  }
}
