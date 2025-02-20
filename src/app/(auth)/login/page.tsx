"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      console.log("User is logged in");
      router.push("/dashboard");
    }
  }, [user, router, isLoading]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {isLogin && (
          <LoginForm
            onRegister={() => {
              setIsLogin(false);
              setIsRegistering(true);
            }}
          />
        )}

        {isRegistering && (
          <RegisterForm
            onBack={() => {
              setIsLogin(true);
              setIsRegistering(false);
            }}
          />
        )}
      </div>
    </>
  );
}
