"use client";

import { useState, useEffect } from "react";
import { SessionTimer } from "@/components/study/SessionTimer";
import { Headphones, BrainCircuit, BookOpen, Link, Save, CheckCircle2 } from "lucide-react";
import { logStudySession } from "@/lib/firebase/services/sessionService";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function StudySessionPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [activeCategory, setActiveCategory] = useState("input");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };
  
  const categories = [
    { id: "input", label: "Comprehensible Input", desc: "Podcasts, Vídeos, Leitura", icon: Headphones },
    { id: "recall", label: "Active Recall", desc: "Flashcards, Spaced Repetition", icon: BrainCircuit },
    { id: "grammar", label: "Estrutura / Gramática", desc: "Regras, Sintaxe", icon: BookOpen },
  ];

  const handleSaveSession = async () => {
    if (!user) {
      alert("Você precisa estar logado para salvar.");
      return;
    }
    if (seconds < 60) {
      alert("A sessão precisa ter pelo menos 1 minuto para ser salva.");
      return;
    }

    setIsSaving(true);
    // Pause timer
    setIsActive(false);

    try {
      const minutes = Math.floor(seconds / 60);
      
      await logStudySession({
        user_id: user.uid,
        session_type: activeCategory,
        duration_minutes: minutes,
        notes: notes,
        reference_url: url,
        timestamp: Date.now()
      });

      setSavedSuccess(true);
      
      // Reset after 3 seconds and go to dashboard
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error) {
      console.error("Error saving session:", error);
      alert("Erro ao salvar sessão.");
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-[calc(100vh-2rem)] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
      
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Deep Work Session</h1>
        <p className="text-zinc-400">Rastreie seu tempo rumo às 1.200 horas de imersão.</p>
      </header>

      {/* Timer Section */}
      <div className="bg-brand-gray/10 border border-zinc-800/50 rounded-3xl p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
        
        <SessionTimer 
          seconds={seconds} 
          isActive={isActive} 
          toggleTimer={toggleTimer} 
          resetTimer={resetTimer} 
        />

        {/* Categorization & Notes */}
        <div className="mt-8 pt-8 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Pilar Neurocientífico</h3>
            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  disabled={isActive || isSaving}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left
                    ${activeCategory === cat.id 
                      ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan glow-cyan' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    }
                    ${(isActive || isSaving) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <cat.icon className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">{cat.label}</div>
                    <div className={`text-xs ${activeCategory === cat.id ? 'text-brand-cyan/80' : 'text-zinc-500'}`}>
                      {cat.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Notas da Sessão</h3>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              disabled={isActive || isSaving}
              className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan resize-none transition-all placeholder:text-zinc-600 disabled:opacity-50"
              placeholder="Cole o link do podcast, a palavra difícil ou suas reflexões aqui..."
            />
            
            <div className={`flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-1 focus-within:border-brand-cyan focus-within:ring-1 focus-within:ring-brand-cyan transition-all ${isActive || isSaving ? 'opacity-50' : ''}`}>
              <div className="pl-3 text-zinc-500">
                <Link className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={isActive || isSaving}
                className="flex-1 bg-transparent text-sm p-2 text-zinc-100 focus:outline-none placeholder:text-zinc-600"
                placeholder="URL de referência (opcional)"
              />
            </div>

            <button 
              onClick={handleSaveSession}
              disabled={isActive || isSaving || seconds < 60}
              className={`w-full mt-4 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-500
                ${savedSuccess 
                  ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                  : 'bg-zinc-100 hover:bg-white text-zinc-950 disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500'
                }
              `}
            >
              {isSaving ? (
                <span>Salvando...</span>
              ) : savedSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Sessão Salva!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Logar Sessão no Cofre
                </>
              )}
            </button>
            {seconds < 60 && !savedSuccess && (
              <p className="text-xs text-center text-brand-orange mt-2">Mínimo de 1 minuto para salvar.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
