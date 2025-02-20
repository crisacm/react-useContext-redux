"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name?: string;
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    documentType: string,
    userDocument: string,
    email: string,
    password: string,
    optionalEmailSubscription: boolean
  ) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        const response = await fetch("/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log("User data:", userData);
        } else {
          document.cookie = "token=; Max-Age=0; Path=/;";
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error en login");

      const { user } = await response.json();
      document.cookie = `token=${user.token}; Path=/; Secure; SameSite=Strict`;

      setUser(user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        document.cookie = "token=; Max-Age=0; Path=/;";
        setUser(null);
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    documentType: string,
    userDocument: string,
    email: string,
    password: string,
    optionalEmailSubscription: boolean
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          documentType,
          userDocument,
          email,
          password,
          optionalEmailSubscription,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error en login");

      const { user } = await response.json();
      document.cookie = `token=${user.token}; Path=/; Secure; SameSite=Strict`;

      setUser(user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
