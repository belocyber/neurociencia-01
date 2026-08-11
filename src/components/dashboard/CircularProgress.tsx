export function CircularProgress({ 
  currentHours, 
  goalHours = 1200 
}: { 
  currentHours: number; 
  goalHours?: number; 
}) {
  const radius = 120;
  const stroke = 16;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min((currentHours / goalHours) * 100, 100);
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-90 origin-center transition-all duration-1000 ease-out"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" />
            <stop offset="100%" stopColor="var(--color-brand-orange)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background Circle */}
        <circle
          stroke="var(--color-brand-gray)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: circumference * 0.25 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          className="opacity-50"
        />
        
        {/* Progress Circle */}
        <circle
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: strokeDashoffset + circumference * 0.25 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out drop-shadow-xl"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold tracking-tight text-white">
          {currentHours} <span className="text-zinc-500 text-2xl font-light">/ {goalHours}</span>
        </span>
        <span className="text-sm font-medium text-zinc-400 mt-1">Horas Logadas</span>
        <span className="text-brand-cyan text-sm font-semibold mt-2">{percent.toFixed(1)}%</span>
      </div>
    </div>
  );
}
