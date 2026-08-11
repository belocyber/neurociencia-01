export function CEFRTimeline({ currentLevel }: { currentLevel: string }) {
  const levels = [
    { code: 'A1', label: 'Iniciante' },
    { code: 'A2', label: 'Básico' },
    { code: 'B1', label: 'Intermediário' },
    { code: 'B2', label: 'Pós-Intermediário' },
    { code: 'C1', label: 'Avançado' },
    { code: 'C2', label: 'Fluência Total' },
  ];

  return (
    <div className="w-full mt-10">
      <div className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">CEFR</div>
      <div className="flex w-full overflow-hidden rounded-md border border-zinc-800">
        {levels.map((level, index) => {
          const isActive = level.code === currentLevel;
          const isPast = levels.findIndex(l => l.code === currentLevel) > index;
          
          return (
            <div 
              key={level.code}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-300
                ${isActive ? 'bg-brand-orange/20 text-brand-orange border-b-2 border-brand-orange' : 
                  isPast ? 'bg-zinc-800/50 text-zinc-300' : 'bg-brand-gray/30 text-zinc-600'}
              `}
              style={{
                clipPath: index < levels.length - 1 ? 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' : 'none',
                marginRight: index < levels.length - 1 ? '-10px' : '0',
                paddingRight: index < levels.length - 1 ? '15px' : '0'
              }}
            >
              <span className={`font-bold ${isActive ? 'text-brand-orange drop-shadow-[0_0_8px_rgba(255,123,0,0.8)]' : ''}`}>
                {level.code}
              </span>
              <span className="text-[10px] sm:text-xs mt-1 truncate w-full text-center">{level.label}</span>
              {isActive && (
                <div className="absolute inset-0 glow-orange opacity-10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
