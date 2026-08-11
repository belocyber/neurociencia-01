"use client";

import { useState } from "react";
import { BrainCircuit, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserProfile, createUserProfile } from "@/lib/firebase/services/userService";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function AuthPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();

  const handleAuthSuccess = async (firebaseUser: any) => {
    let profile = await getUserProfile(firebaseUser.uid);
    if (!profile) {
      profile = await createUserProfile(
        firebaseUser.uid, 
        firebaseUser.email || "", 
        firebaseUser.displayName || "Neuro Learner"
      );
    }
    setUser(firebaseUser);
    setLoading(false);
    router.push("/");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    try {
      if (isRegisterMode) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(result.user);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso.");
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError("E-mail ou senha incorretos.");
      } else {
        setError("Erro ao autenticar. Verifique seus dados.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user);
    } catch (err) {
      console.error("Google Auth error:", err);
      setError("Erro ao logar com o Google.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Neural Background Simulation */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        
        <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-brand-cyan shadow-[0_0_20px_rgba(0,242,254,0.3)] p-8">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(0,242,254,0.1)] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center mb-6 relative z-20">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-gray border border-brand-cyan/30 text-brand-cyan mb-4 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">Neuro-Language Tracker</h1>
            <h2 className="text-lg font-medium text-zinc-400">
              {isRegisterMode ? "Crie sua Mente Bilíngue." : "Acesse sua Mente Bilíngue."}
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4 text-center relative z-20">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 relative z-20">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                  placeholder="ex: estudoacademico@gmail.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                  placeholder="Min 6 caracteres"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,123,0,0.4)] transition-all mt-4 disabled:opacity-50"
            >
              {isLoggingIn ? "Processando..." : (isRegisterMode ? "Cadastrar" : "Entrar")}
            </button>
            
            <div className="flex justify-center pt-2">
              <button 
                type="button" 
                onClick={() => { setIsRegisterMode(!isRegisterMode); setError(""); }}
                className="text-sm font-medium text-brand-cyan hover:text-brand-cyan/80 transition-colors"
              >
                {isRegisterMode ? "Já tenho uma conta. Fazer login." : "Não tem conta? Cadastre-se."}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center mt-6 mb-6 z-20">
            <div className="absolute inset-x-0 h-px bg-zinc-800"></div>
            <div className="relative bg-zinc-950 px-4 text-xs text-zinc-500 font-medium">
              ou acesse com
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 relative z-20">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
            >
              <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                <span className="text-blue-500 font-bold text-sm">G</span>
              </span>
              Continuar com Google
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
