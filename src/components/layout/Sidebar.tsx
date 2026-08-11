"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, LayoutDashboard, Timer, BookA, Gamepad2, Settings } from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Painel de Progresso", href: "/", icon: LayoutDashboard },
  { name: "Sessão de Estudo", href: "/study", icon: Timer },
  { name: "Lições Interativas", href: "/practice", icon: Gamepad2 },
  { name: "Cofre de Vocabulário", href: "/vault", icon: BookA },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-brand-dark border-r border-zinc-800">
      <div className="flex h-16 items-center gap-3 px-6 bg-zinc-950/50">
        <Brain className="h-8 w-8 text-brand-cyan drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-orange">
          NeuroTracker
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                isActive
                  ? "bg-brand-cyan/10 text-brand-cyan border-r-2 border-brand-cyan glow-cyan"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
                "group flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-all"
              )}
            >
              <item.icon
                className={clsx(
                  isActive ? "text-brand-cyan" : "text-zinc-500 group-hover:text-zinc-300",
                  "h-5 w-5 shrink-0 transition-colors"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
        >
          <Settings className="h-5 w-5 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          Configurações
        </Link>
      </div>
    </div>
  );
}
