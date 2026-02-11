"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import  Cookies from "js-cookie";
import { JwtPayload } from "@/types/jwt";
import { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  const login = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);
    setUserId(decoded.sub);
    Cookies.set('auth_token', token);
  }

  const logout = () => {
    setUserId(null);
    Cookies.remove('auth_token');
  }

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}