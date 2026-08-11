import { Headphones, Brain } from "lucide-react";

interface VocabCardProps {
  word: string;
  translation: string;
  context: string;
  masteryLevel: number; // 0 to 100
  nextReviewDate: string;
  urgent?: boolean;
  isConsolidated?: boolean;
}

export function VocabCard({ 
  word, 
  translation, 
  context, 
  masteryLevel, 
  nextReviewDate,
  urgent = false,
  isConsolidated = false
}: VocabCardProps) {

  // Determine colors based on state
  let cardClass = "bg-brand-gray/20 border-zinc-800/80";
  let wordClass = "text-zinc-100";
  let barColorClass = "bg-brand-cyan";
  
  if (urgent) {
    cardClass = "bg-brand-gray/20 border-brand-orange/60 shadow-[0_0_15px_rgba(255,123,0,0.15)]";
    wordClass = "text-brand-orange";
    barColorClass = "bg-brand-orange";
  } else if (isConsolidated) {
    cardClass = "bg-brand-gray/20 border-brand-cyan/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]";
    wordClass = "text-brand-cyan glow-cyan";
  }

  // Highlight the target word in the context
  // Case-insensitive replacement
  const regex = new RegExp(`(${word})`, 'gi');
  const highlightedContext = context.replace(
    regex, 
    `<span class="${urgent ? 'text-brand-orange font-semibold' : 'text-brand-cyan font-semibold'}">$1</span>`
  );

  return (
    <div className={`rounded-2xl p-5 border flex flex-col transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${cardClass}`}>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold ${wordClass}`}>{word}</h3>
        {isConsolidated ? (
          <Brain className="w-5 h-5 text-brand-cyan/60" />
        ) : (
          <Headphones className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        )}
      </div>

      <div className="flex-1">
        <p 
          className="text-zinc-300 text-sm leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: highlightedContext }}
        />
        <p className="text-zinc-500 text-sm mb-4">{translation}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-800/50">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-zinc-400">Nível de Maestria</span>
          <span className="text-zinc-500 font-mono">{masteryLevel}%</span>
        </div>
        <div className="w-full bg-zinc-900 rounded-full h-1.5 mb-3">
          <div 
            className={`h-1.5 rounded-full ${barColorClass} transition-all duration-1000`} 
            style={{ width: `${masteryLevel}%` }}
          />
        </div>
        <div className="text-xs text-zinc-500 flex justify-between">
          <span>Próxima Revisão</span>
          <span className={urgent ? "text-brand-orange" : ""}>{nextReviewDate}</span>
        </div>
      </div>

    </div>
  );
}
