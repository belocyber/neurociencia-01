"use client";

import { useState } from "react";

interface ActiveRecallChallengeProps {
  sentenceParts: string[]; // e.g. ["I would like some...", ""]
  options: string[]; // e.g. ["COFFEE", "TEACHER"]
  correctOption: string;
  onSuccess: () => void;
  imageUrl?: string;
}

export function ActiveRecallChallenge({ 
  sentenceParts, 
  options, 
  correctOption, 
  onSuccess,
  imageUrl 
}: ActiveRecallChallengeProps) {
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleVerify = () => {
    if (selectedOption === correctOption) {
      setHasError(false);
      onSuccess();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-6 items-center w-full max-w-4xl">
      
      {/* Challenge Image */}
      <div className="w-48 h-32 rounded-xl overflow-hidden bg-amber-100 flex-shrink-0 flex items-center justify-center border border-zinc-800">
        {imageUrl ? (
          <img src={imageUrl} alt="Challenge context" className="object-cover w-full h-full opacity-80" />
        ) : (
          <span className="text-amber-800/20 font-bold text-2xl">IMG</span>
        )}
      </div>

      {/* Challenge Content */}
      <div className="flex-1 w-full">
        <h3 className="text-xl font-medium text-zinc-100 mb-6">
          {sentenceParts[0]} <span className="text-brand-cyan border-b-2 border-brand-cyan px-4 py-1 mx-1">{selectedOption || "_____"}</span> {sentenceParts[1]}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedOption(opt)}
              className={`p-4 rounded-xl border-2 transition-all font-bold tracking-wide
                ${selectedOption === opt 
                  ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/10 glow-cyan' 
                  : 'border-zinc-800 text-zinc-400 bg-zinc-900 hover:bg-zinc-800'
                }
              `}
            >
              **{opt}**
            </button>
          ))}
        </div>

        <button 
          onClick={handleVerify}
          disabled={!selectedOption}
          className={`w-full py-4 rounded-xl font-bold transition-all
            ${!selectedOption 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : hasError
                ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'bg-brand-orange text-white hover:bg-brand-orange/90 shadow-[0_0_15px_rgba(255,123,0,0.4)]'
            }
          `}
        >
          {hasError ? "Tente Novamente!" : "Verificar Resposta"}
        </button>
      </div>

    </div>
  );
}
