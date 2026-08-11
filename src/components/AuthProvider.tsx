"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (!user && pathname !== "/auth") {
        router.push("/auth");
      } else if (user && pathname === "/auth") {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-dark text-brand-cyan">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-cyan border-t-transparent animate-spin mb-4"></div>
          <p className="font-medium tracking-widest text-sm uppercase">Carregando Sinapses...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
