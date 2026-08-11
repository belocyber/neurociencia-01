"use client";

import { Play, Pause, Square } from "lucide-react";

interface SessionTimerProps {
  seconds: number;
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export function SessionTimer({ seconds, isActive, toggleTimer, resetTimer }: SessionTimerProps) {
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-7xl sm:text-9xl font-mono tracking-widest font-bold mb-12 transition-colors duration-300
        ${isActive ? 'text-brand-cyan drop-shadow-[0_0_20px_rgba(0,242,254,0.6)]' : 'text-zinc-100'}`}>
        {formatTime(seconds)}
      </div>

      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isActive ? 'bg-zinc-800 text-brand-orange hover:bg-zinc-700 hover:glow-orange' : 'bg-brand-cyan text-zinc-950 hover:bg-brand-cyan/80 glow-cyan'
          }`}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        
        <button 
          onClick={resetTimer}
          disabled={seconds === 0}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Square className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
