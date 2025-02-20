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

  const { email, password } = await request.json();

  if (email === "test@demo.com" && password === "1234") {
    return NextResponse.json(
      {
        message: "Login success",
        user: {
          id: 1,
          name: "Not real user",
          email: email,
          token: "this_token_not_are_a_real_one",
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Wrong credentials" },
    { status: 401 }
  );
}
