export function ConsistencyHeatmap() {
  // Generate mock data for the heatmap (last 12 weeks)
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const weeks = 20;
  
  const generateIntensity = () => {
    const r = Math.random();
    if (r > 0.8) return 4;
    if (r > 0.5) return 3;
    if (r > 0.3) return 2;
    if (r > 0.1) return 1;
    return 0;
  };

  const getBgColor = (intensity: number) => {
    switch (intensity) {
      case 4: return 'bg-brand-cyan glow-cyan';
      case 3: return 'bg-brand-cyan/70';
      case 2: return 'bg-brand-cyan/40';
      case 1: return 'bg-brand-cyan/20';
      default: return 'bg-zinc-800/40';
    }
  };

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
          {/* Months header (mocked spacing) */}
          <div className="flex justify-between text-xs text-zinc-500 font-medium pb-2">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const intensity = generateIntensity();
                  return (
                    <div 
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-4 h-4 rounded-sm transition-colors hover:border-white border-transparent border cursor-pointer ${getBgColor(intensity)}`}
                      title={`Intensidade: ${intensity}`}
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
