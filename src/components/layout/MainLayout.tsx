"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans">
      {!isAuthPage && <Sidebar />}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
