"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import clsx from "clsx";

export function SessionTimer({ onStop }: { onStop: (minutes: number) => void }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = () => setIsActive(!isActive);

  const stop = () => {
    setIsActive(false);
    onStop(Math.round(seconds / 60));
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-xl w-full max-w-md mx-auto">
      <div className="text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tabular-nums mb-8 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        {formatTime(seconds)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggle}
          className={clsx(
            "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all",
            isActive
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          )}
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          {isActive ? "Pausar" : "Iniciar Foco"}
        </button>
        <button
          onClick={stop}
          disabled={seconds === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Square className="w-5 h-5 fill-current" />
          Encerrar
        </button>
      </div>
    </div>
  );
}
