"use client";

export default function Terms() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Terms and Conditions</h1>

        <p className="mt-6 text-gray-500">
          Okay, let’s say the terms and conditions for using this platform—which
          is really just a playground to test out some tech—are simple: if you
          find a bug or something blows up, you don’t tell anyone. Deal? I mean,
          fair’s fair, right? 😏
        </p>

        <p className="mt-4 text-gray-500">
          Alright then, back to business.{" "}
          <a href="/login" className="text-blue-600 p-2">
            Let’s get to it!
          </a>
        </p>
      </div>
    </div>
  );
}
