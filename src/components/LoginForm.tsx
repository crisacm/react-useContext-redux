"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginCredentialsSchema } from "@/schemas/userSchema";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({ onRegister }: LoginFormProps) {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginCredentialsSchema),
  });

  const onHandleSubmit = (data: z.infer<typeof loginCredentialsSchema>) => {
    signIn(data.email, data.password);
  };

  return (
    <>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Let&apos;s try the sessions!
        </h1>

        <p className="mt-4 text-gray-500">
          We are going to test the complete handling of login, registration and
          logout, all implementing best practices or at least the most
          recommended ones.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              placeholder="Enter email"
              {...register("email")}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </span>
          </div>

          {errors.email && (
            <span className="block p-2 text-sm text-red-600/70">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              placeholder="Enter password"
              {...register("password")}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </span>
          </div>

          {errors.password && (
            <span className="block p-2 text-sm text-red-600/70">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <button
              type="button"
              onClick={onRegister}
              className="font-medium text-indigo-600 hover:text-indigo-500 underline pl-3"
            >
              Sign up
            </button>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}
