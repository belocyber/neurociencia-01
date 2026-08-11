"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, LayoutDashboard, Timer, BookA, Settings } from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Painel de Progresso", href: "/", icon: LayoutDashboard },
  { name: "Sessão de Estudo", href: "/study", icon: Timer },
  { name: "Cofre de Vocabulário", href: "/vocabulary", icon: BookA },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-900 border-r border-zinc-800">
      <div className="flex h-16 items-center gap-3 px-6 bg-zinc-950/50">
        <Brain className="h-8 w-8 text-indigo-500" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          NeuroFluency
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
                  ? "bg-zinc-800 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              )}
            >
              <item.icon
                className={clsx(
                  isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200",
                  "h-5 w-5 shrink-0"
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
          className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors"
        >
          <Settings className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-zinc-200" />
          Configurações
        </Link>
      </div>
    </div>
  );
}
