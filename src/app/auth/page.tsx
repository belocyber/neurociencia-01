"use client";

import { BrainCircuit, Mail, Lock } from "lucide-react";
// Assuming there is a generic Google icon, or we can just use text/span since lucide doesn't have a direct google logo usually, we'll use a generic one or text.
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Neural Background Simulation */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        
        {/* Glow Container */}
        <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-brand-cyan shadow-[0_0_20px_rgba(0,242,254,0.3)] p-8">
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(0,242,254,0.1)] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center mb-8 relative z-20">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-gray border border-brand-cyan/30 text-brand-cyan mb-4 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">Neuro-Language Tracker</h1>
            <h2 className="text-lg font-medium text-zinc-400">Acesse sua Mente Bilíngue.</h2>
          </div>

          {/* Form */}
          <form className="space-y-4 relative z-20">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                  placeholder="E-mail"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide ml-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                  placeholder="Senha"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Link href="#" className="text-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="button" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,123,0,0.4)] transition-all mt-4">
              Entrar
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center mt-8 mb-6 z-20">
            <div className="absolute inset-x-0 h-px bg-zinc-800"></div>
            <div className="relative bg-zinc-950 px-4 text-xs text-zinc-500 font-medium">
              ou acesse com
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 relative z-20">
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
              <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                {/* Mocking standard Google 'G' with span since lucide doesn't have it natively */}
                <span className="text-blue-500 font-bold text-sm">G</span>
              </span>
              Continuar com Google
            </button>
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
              <span className="flex items-center justify-center w-5 h-5 bg-white text-zinc-900 rounded-full font-bold text-[10px]">GH</span>
              Continuar com Github
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
