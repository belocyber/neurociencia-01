import { BrainCircuit, Clock, Trophy, Target } from "lucide-react";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { StatCard } from "@/components/dashboard/StatCard";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Painel de Progresso</h1>
        <p className="text-zinc-400 mt-2">Acompanhe sua jornada neurocientífica rumo à fluência.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tempo de Estudo" value="120 min" subtitle="Hoje" icon={Clock} />
        <StatCard title="Nível Atual" value="B1" subtitle="Intermediário" icon={Target} />
        <StatCard title="Palavras Revisadas" value="45" subtitle="Spaced Repetition" icon={BrainCircuit} />
        <StatCard title="Horas Totais" value="450" subtitle="Rumo a 1.200h" icon={Trophy} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
          <ProgressRing progress={37.5} totalHours={450} goalHours={1200} />
          <h3 className="mt-6 text-sm font-medium text-zinc-400">Progresso de Mielinização</h3>
        </div>
        
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit className="w-48 h-48 text-indigo-400" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Ponto de Não Retorno</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed max-w-2xl text-lg">
              A neurociência comprova que atingir a marca de <strong className="text-indigo-400">1.200 horas</strong> de Input Compreensível 
              e Prática Deliberada cria as conexões neurais necessárias para a memória procedural. 
              Você está a caminho da fluência natural!
            </p>
            <div className="w-full bg-zinc-950 rounded-full h-3 mb-3 border border-zinc-800">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full relative" style={{ width: '37.5%' }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 font-bold uppercase tracking-wider">
              <span>A1 (Iniciante)</span>
              <span>C2 (Fluência)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
