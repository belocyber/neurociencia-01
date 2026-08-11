"use client";

import { useState } from "react";
import { SessionTimer } from "@/components/study/SessionTimer";
import { CheckCircle2, Brain } from "lucide-react";

export default function StudyPage() {
  const [loggedMinutes, setLoggedMinutes] = useState<number | null>(null);
  const [sessionType, setSessionType] = useState("input");

  const handleStop = (minutes: number) => {
    setLoggedMinutes(minutes);
    // Aqui seria feita a chamada para salvar no Firestore
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-indigo-400" />
          Registro de Sessão
        </h1>
        <p className="text-zinc-400 mt-2">Prática deliberada constrói memória procedural.</p>
      </header>

      {loggedMinutes === null ? (
        <div className="space-y-8">
          <div className="flex justify-center gap-4 mb-8">
            {["input", "active_recall", "grammar"].map((type) => (
              <button
                key={type}
                onClick={() => setSessionType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  sessionType === type
                    ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {type === "input" && "Input Compreensível"}
                {type === "active_recall" && "Active Recall"}
                {type === "grammar" && "Gramática Base"}
              </button>
            ))}
          </div>

          <SessionTimer onStop={handleStop} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-3xl p-12 shadow-xl text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Sessão Salva!</h2>
          <p className="text-zinc-400 mb-8">
            Você registrou <strong className="text-indigo-400">{loggedMinutes} minutos</strong> de {sessionType.replace("_", " ")}.
            Isso fortalece suas conexões neurais.
          </p>
          <button
            onClick={() => setLoggedMinutes(null)}
            className="px-6 py-2 bg-zinc-800 text-zinc-100 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
          >
            Nova Sessão
          </button>
        </div>
      )}
    </div>
  );
}
