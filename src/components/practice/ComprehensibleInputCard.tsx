interface ComprehensibleInputCardProps {
  id: number;
  english: string;
  portuguese: string;
  imageUrl?: string; // We'll use a placeholder or generic shape if not provided
}

export function ComprehensibleInputCard({ id, english, portuguese, imageUrl }: ComprehensibleInputCardProps) {
  return (
    <div className="bg-brand-gray/30 border border-zinc-800 rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.02]">
      {/* Number Badge */}
      <div className="bg-zinc-800 text-zinc-300 text-xs font-bold px-3 py-1 rounded-br-lg self-start">
        {id}
      </div>
      
      {/* Image Area - Mocking with a colored placeholder if no image */}
      <div className="h-32 w-full flex items-center justify-center p-2">
        <div className="w-full h-full bg-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={english} className="object-cover w-full h-full opacity-80" />
          ) : (
            <span className="text-amber-800/20 font-bold text-4xl">IMG</span>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div className="p-4 pt-2">
        <h3 className="text-lg font-bold text-zinc-100">{english}</h3>
        <p className="text-sm text-zinc-500 mt-1">{portuguese}</p>
      </div>
    </div>
  );
}
