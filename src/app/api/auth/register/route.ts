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

  const {
    firstName,
    lastName,
    phoneNumber,
    documentType,
    userDocument,
    email,
    password,
    optionalEmailSubscription,
  } = await request.json();

  return NextResponse.json(
    {
      message: "Register success",
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
