"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

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
