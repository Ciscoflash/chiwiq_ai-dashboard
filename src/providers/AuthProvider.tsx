"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, tokenStore } from "@/lib/api";
import type { Admin } from "@/lib/types";

interface AuthContextValue {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshProfile = useCallback(async () => {
    try {
      const res = await api<Admin>("/admin/profile");
      setAdmin(res.data ?? null);
    } catch {
      setAdmin(null);
    }
  }, []);

  useEffect(() => {
    const stored = tokenStore.get();
    if (stored) {
      setToken(stored);
      api<Admin>("/admin/profile")
        .then((res) => {
          setAdmin(res.data ?? null);
        })
        .catch(() => {
          tokenStore.clear();
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api<{ token: string; admin: Admin }>(
        "/admin/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          auth: false,
        },
      );
      const data = res.data!;
      tokenStore.set(data.token);
      setToken(data.token);
      setAdmin(data.admin);
    },
    [],
  );

  const logout = useCallback(() => {
    tokenStore.clear();
    setToken(null);
    setAdmin(null);
    router.push("/admin/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ admin, token, loading, login, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}