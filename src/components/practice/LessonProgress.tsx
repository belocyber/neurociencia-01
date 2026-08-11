export function LessonProgress({ current, total }: { current: number, total: number }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="flex items-center gap-6 mb-8 w-full max-w-4xl">
      <span className="text-zinc-300 font-medium whitespace-nowrap">Lição {current} / {total}</span>
      <div className="flex-1 bg-zinc-800 rounded-full h-2 relative">
        <div 
          className="bg-brand-cyan h-2 rounded-full glow-cyan transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
