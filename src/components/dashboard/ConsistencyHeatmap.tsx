"use client";

import { useEffect, useState, useMemo } from "react";
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StudySession } from "@/lib/firebase/services/sessionService";

export function ConsistencyHeatmap({ sessions }: { sessions: StudySession[] }) {
  const weeks = 20; // Show last 20 weeks
  
  // Calculate the dates for the grid
  const gridDates = useMemo(() => {
    const today = new Date();
    const end = endOfWeek(today, { weekStartsOn: 0 }); // Sunday
    const start = subDays(end, (weeks * 7) - 1);
    
    return eachDayOfInterval({ start, end });
  }, [weeks]);

  // Map dates to intensity (minutes)
  const heatmapData = useMemo(() => {
    const data = new Map<string, number>();
    
    sessions.forEach(session => {
      const dateStr = format(new Date(session.timestamp), 'yyyy-MM-dd');
      const current = data.get(dateStr) || 0;
      data.set(dateStr, current + session.duration_minutes);
    });
    
    return data;
  }, [sessions]);

  const getBgColor = (minutes: number) => {
    if (minutes >= 120) return 'bg-brand-cyan glow-cyan'; // 2+ hours
    if (minutes >= 60) return 'bg-brand-cyan/70'; // 1-2 hours
    if (minutes >= 30) return 'bg-brand-cyan/40'; // 30-60 mins
    if (minutes > 0) return 'bg-brand-cyan/20'; // <30 mins
    return 'bg-zinc-800/40'; // 0 mins
  };

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-brand-gray/20 rounded-2xl p-6 border border-zinc-800/50 w-full overflow-x-auto">
      <h3 className="text-lg font-semibold text-zinc-100 mb-6">Consistência de Imersão (Mielinização)</h3>
      <div className="flex gap-4">
        {/* Y Axis (Days) */}
        <div className="flex flex-col gap-2 pt-6">
          {days.map((day, i) => (
            <div key={day} className="text-xs text-zinc-500 font-medium h-4 flex items-center">
              {i % 2 !== 0 ? day : ''}
            </div>
          ))}
        </div>
        
        {/* Heatmap Grid */}
        <div className="flex flex-col gap-2">
          {/* Months header (mocked spacing for simplicity, can be improved to align perfectly) */}
          <div className="flex justify-between text-xs text-zinc-500 font-medium pb-2 min-w-max">
            {/* Just displaying a static text for now to match structure, actual month alignment is complex */}
            <span>Últimas 20 Semanas</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const date = gridDates[weekIndex * 7 + dayIndex];
                  if (!date) return null;
                  
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const minutes = heatmapData.get(dateStr) || 0;
                  
                  return (
                    <div 
                      key={dateStr}
                      className={`w-4 h-4 rounded-sm transition-colors hover:border-white border-transparent border cursor-pointer ${getBgColor(minutes)}`}
                      title={`${format(date, "dd 'de' MMM", { locale: ptBR })}: ${minutes} minutos`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
