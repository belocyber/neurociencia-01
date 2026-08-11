import { Search, Filter } from "lucide-react";
import { VocabCard } from "@/components/vault/VocabCard";

export default function VocabularyVaultPage() {
  
  // Mock data representing spaced repetition states
  const vocabList = [
    { id: 1, word: "Acquire", translation: "Adquirir, assimilar", context: "Our brain is wired to acquire language naturally through input.", masteryLevel: 45, nextReviewDate: "Em 3 dias" },
    { id: 2, word: "Appalling", translation: "Chocante, péssimo", context: "The conditions in the old prison were truly appalling to witness.", masteryLevel: 85, nextReviewDate: "Em 14 dias", isConsolidated: true },
    { id: 3, word: "Neural Plasticity", translation: "Plasticidade Neural", context: "Neural Plasticity is the reason we can acquire new habits and languages.", masteryLevel: 95, nextReviewDate: "Em 30 dias", isConsolidated: true },
    { id: 4, word: "Overwhelming", translation: "Esmagador", context: "The amount of new vocabulary can feel overwhelming at first.", masteryLevel: 20, nextReviewDate: "Hoje", urgent: true },
    { id: 5, word: "Mielinização", translation: "Myelination", context: "Mielinização helps speed up the neural pathways for faster recall.", masteryLevel: 30, nextReviewDate: "Amanhã", urgent: true },
    { id: 6, word: "Dwindle", translation: "Diminuir, minguar", context: "His motivation began to dwindle after weeks of no clear progress.", masteryLevel: 60, nextReviewDate: "Em 5 dias" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-500">
      
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
            Vocabulary Vault<span className="text-brand-cyan">.</span>
          </h1>
          <p className="text-zinc-400 mt-2">Onde a memória declarativa se transforma em procedural.</p>
        </div>
        
        {/* Background ambient neural brain image is requested via CSS or absolute positioning usually, we'll keep the layout clean */}
      </header>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="Pesquisar vocabulário ou frase..."
          />
        </div>

        <div className="flex gap-4 lg:w-72 bg-brand-gray/20 p-2 rounded-xl border border-zinc-800/50 h-fit">
          <div className="flex flex-col w-full px-2 py-1">
            <div className="flex items-center gap-2 text-zinc-400 mb-2 px-1">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold">Filtros de Memória</span>
            </div>
            
            <select className="w-full bg-zinc-900 text-sm text-zinc-300 border border-zinc-800 rounded-md p-2 mb-2 focus:outline-none focus:border-brand-cyan">
              <option>Nível de Maestria</option>
              <option>Mais Recentes</option>
              <option>Mais Antigos</option>
            </select>
            
            <select className="w-full bg-zinc-900 text-sm text-zinc-300 border border-zinc-800 rounded-md p-2 focus:outline-none focus:border-brand-cyan">
              <option>Data de Revisão (Urgentes)</option>
            </select>
          </div>
        </div>
        
      </div>

      {/* Vocabulary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vocabList.map(vocab => (
          <VocabCard 
            key={vocab.id}
            word={vocab.word}
            translation={vocab.translation}
            context={vocab.context}
            masteryLevel={vocab.masteryLevel}
            nextReviewDate={vocab.nextReviewDate}
            urgent={vocab.urgent}
            isConsolidated={vocab.isConsolidated}
          />
        ))}
      </div>

    </div>
  );
}
