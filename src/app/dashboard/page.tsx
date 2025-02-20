"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 70px)",
        }}
      >
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Perfect! we already have the session management
          </h1>

          <p className="mt-4 text-gray-500">
            That&apos;s all for now. Once we figure out how to manage sessions
            through Context, we can move on to the next level. We could even
            create a whole platform, ha ha!
          </p>
        </div>
      </div>
    </>
  );
}
