"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Clock, Trophy, Target, Flame } from "lucide-react";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { CEFRTimeline } from "@/components/dashboard/CEFRTimeline";
import { ConsistencyHeatmap } from "@/components/dashboard/ConsistencyHeatmap";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { getUserProfile, UserProfile } from "@/lib/firebase/services/userService";
import { getUserSessions, StudySession } from "@/lib/firebase/services/sessionService";

export default function Dashboard() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(user.uid);
        const userSessions = await getUserSessions(user.uid);
        setProfile(userProfile);
        setSessions(userSessions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand-cyan border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const currentHours = profile ? Math.floor(profile.total_study_minutes / 60) : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          Neuro-Tracker Dashboard<span className="text-brand-cyan">.</span>
        </h1>
        {profile && <p className="text-zinc-400 mt-2">Bem-vindo(a), {profile.name || user?.email}</p>}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Tracker Card */}
        <div className="lg:col-span-2 bg-brand-gray/20 border border-zinc-800/50 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl">
          <h2 className="text-xl font-medium text-zinc-300 mb-8 z-10">Rumo à Neuro-Fluência (Ponto de Não Retorno)</h2>
          
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <CircularProgress currentHours={currentHours} goalHours={1200} />
            <CEFRTimeline currentLevel={profile?.current_cefr_level || "A1"} />
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Vital Stats Card */}
        <div className="lg:col-span-1 bg-brand-gray/20 border border-zinc-800/50 rounded-2xl p-8 flex flex-col shadow-2xl">
          <h2 className="text-xl font-medium text-zinc-300 mb-8">Estatísticas Vitais</h2>
          
          <div className="flex flex-col space-y-8">
            <div>
              <span className="text-sm font-medium text-zinc-400">Total Estudado</span>
              <div className="text-2xl font-bold text-zinc-100 mt-1 flex items-center gap-2">
                {currentHours} <span className="text-sm font-normal text-zinc-500">horas</span> e {profile ? profile.total_study_minutes % 60 : 0} <span className="text-sm font-normal text-zinc-500">min</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-zinc-400">Sessões Realizadas</span>
              <div className="text-2xl font-bold text-zinc-100 mt-1 flex items-center gap-2">
                {sessions.length} <span className="text-sm font-normal text-zinc-500">sessões</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-zinc-400">Nível Oficial</span>
              <div className="text-2xl font-bold text-brand-orange mt-1 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,123,0,0.5)]">
                {profile?.current_cefr_level || "A1"}
                <Flame className="w-5 h-5 ml-1" />
              </div>
            </div>
          </div>
        </div>

      </div>

      <ConsistencyHeatmap sessions={sessions} />
      
    </div>
  );
}
