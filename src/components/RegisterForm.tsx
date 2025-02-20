"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { mappedDocumentTypes, registerSchema } from "@/schemas/userSchema";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onBack: () => void;
}

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const documentTypesOptions = Object.entries(mappedDocumentTypes).map(
    ([key, value]) => {
      return (
        <option key={key} value={key}>
          {value}
        </option>
      );
    }
  );

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API call
    console.log("Register form submitted:", data);
    // Here you can add your actual API integration
    alert("Registration successful!");
    // onBack(); // Return to login form after successful registration
  };

  return (
    <>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Need some user, hum? 🤔
        </h1>

        <p className="mt-4 text-gray-500">
          Okay, tell me a little bit about yourself so I can let you continue. You don&apos;t have to be 100% honest with us, as long as you fill in the fields. At the end of the day, none of this is real anyway. ✨ 
        </p>
      </div>

      <div className="flex items-center justify-center m-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Login
        </button>
      </div>

      <form
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700"
            >
              Document Type
            </label>
            <select
              {...register("documentType")}
              id="documentType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select document type</option>
              {documentTypesOptions}
            </select>
            {errors.documentType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.documentType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="documentNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Document Number
            </label>
            <input
              {...register("documentNumber")}
              id="documentNumber"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.documentNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.documentNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              {...register("confirmPassword")}
              type={showPasswordRepeat ? "text" : "password"}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
            >
              {showPasswordRepeat ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <input
              {...register("termsAccepted")}
              id="termsAccepted"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="termsAccepted"
              className="ml-2 block text-sm text-gray-900"
            >
              I accept the{" "}
              <a
                href="/terms"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                rel="noopener noreferrer"
              >
                terms and conditions
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-sm text-red-600">
              {errors.termsAccepted.message}
            </p>
          )}

          <div className="flex items-start">
            <input
              {...register("dataPolicy")}
              id="dataPolicy"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="dataPolicy"
              className="ml-2 block text-sm text-gray-900"
            >
              I accept the{" "}
              <a
                href="/policy"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                rel="noopener noreferrer"
              >
                data policy
              </a>
            </label>
          </div>
          {errors.dataPolicy && (
            <p className="text-sm text-red-600">{errors.dataPolicy.message}</p>
          )}

          <div className="flex items-start">
            <input
              {...register("promotionalEmails")}
              id="promotionalEmails"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="promotionalEmails"
              className="ml-2 block text-sm text-gray-900"
            >
              I would like to receive promotional emails about products and
              offers
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
}
