"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, ShieldCheck, BookOpen, Globe } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { getUserProfile, UserProfile } from "@/lib/firebase/services/userService";
import { ActiveRecallChallenge } from "@/components/practice/ActiveRecallChallenge";
import { ComprehensibleInputCard } from "@/components/practice/ComprehensibleInputCard";
import { LessonProgress } from "@/components/practice/LessonProgress";

interface PracticeLesson {
  id: number;
  english: string;
  portuguese: string;
  imageUrl?: string;
  sentenceParts: [string, string];
  options: string[];
  correctOption: string;
}

const PRACTICE_LESSONS: Record<string, PracticeLesson[]> = {
  A1: [
    {
      id: 1,
      english: "water",
      portuguese: "água",
      sentenceParts: ["I would like some", "please."],
      options: ["water", "money", "music"],
      correctOption: "water",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "happy",
      portuguese: "feliz",
      sentenceParts: ["She is", "reading a book."],
      options: ["sad", "happy", "sleepy"],
      correctOption: "happy",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "dog",
      portuguese: "cachorro",
      sentenceParts: ["I can see the", "in the park."],
      options: ["cat", "dog", "chair"],
      correctOption: "dog",
      imageUrl: undefined,
    },
  ],
  A2: [
    {
      id: 1,
      english: "usually",
      portuguese: "normalmente",
      sentenceParts: ["He", "goes to the gym."],
      options: ["always", "usually", "never"],
      correctOption: "usually",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "because",
      portuguese: "porque",
      sentenceParts: ["I stayed home", "I was tired."],
      options: ["because", "although", "unless"],
      correctOption: "because",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "often",
      portuguese: "frequentemente",
      sentenceParts: ["They", "travel abroad."],
      options: ["rarely", "often", "always"],
      correctOption: "often",
      imageUrl: undefined,
    },
  ],
  B1: [
    {
      id: 1,
      english: "although",
      portuguese: "embora",
      sentenceParts: ["", "it was raining, we went out."],
      options: ["Because", "Although", "Before"],
      correctOption: "Although",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "improve",
      portuguese: "melhorar",
      sentenceParts: ["She wants to", "her pronunciation."],
      options: ["improve", "decide", "forget"],
      correctOption: "improve",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "difficult",
      portuguese: "difícil",
      sentenceParts: ["This exercise is", "for beginners."],
      options: ["easy", "difficult", "fast"],
      correctOption: "difficult",
      imageUrl: undefined,
    },
  ],
  B2: [
    {
      id: 1,
      english: "challenge",
      portuguese: "desafio",
      sentenceParts: ["The new project is a real", "for the team."],
      options: ["reward", "challenge", "gift"],
      correctOption: "challenge",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "decision",
      portuguese: "decisão",
      sentenceParts: ["After long thought, she made a", ""],
      options: ["decision", "meeting", "promise"],
      correctOption: "decision",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "environment",
      portuguese: "ambiente",
      sentenceParts: ["A healthy study", "helps memory."],
      options: ["environment", "meeting", "language"],
      correctOption: "environment",
      imageUrl: undefined,
    },
  ],
  C1: [
    {
      id: 1,
      english: "conscious",
      portuguese: "consciente",
      sentenceParts: ["She is very", "about her learning habits."],
      options: ["conscious", "careless", "curious"],
      correctOption: "conscious",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "consistency",
      portuguese: "consistência",
      sentenceParts: ["Success comes from", "and practice."],
      options: ["speed", "consistency", "luck"],
      correctOption: "consistency",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "context",
      portuguese: "contexto",
      sentenceParts: ["Understanding the", "makes the text easier."],
      options: ["context", "question", "problem"],
      correctOption: "context",
      imageUrl: undefined,
    },
  ],
  C2: [
    {
      id: 1,
      english: "throughout",
      portuguese: "ao longo de",
      sentenceParts: ["He remained calm", "the entire course."],
      options: ["throughout", "during", "between"],
      correctOption: "throughout",
      imageUrl: undefined,
    },
    {
      id: 2,
      english: "insight",
      portuguese: "visão/insight",
      sentenceParts: ["The lecture provided useful", "into memory."],
      options: ["insight", "noise", "strength"],
      correctOption: "insight",
      imageUrl: undefined,
    },
    {
      id: 3,
      english: "approach",
      portuguese: "abordagem",
      sentenceParts: ["This learning", "is evidence-based."],
      options: ["approach", "solution", "problem"],
      correctOption: "approach",
      imageUrl: undefined,
    },
  ],
};

const LEVEL_DESCRIPTION: Record<string, string> = {
  A1: "Frases básicas e vocabulário simples para ganhar confiança.",
  A2: "Estruturas frequentes e conectores para expressar ideias.",
  B1: "Sentenças mais completas e vocabulário comum em conversas." ,
  B2: "Prática com frases mais fluídas e palavras de uso avançado.",
  C1: "Vocabulário preciso e frases mais complexas para fluência ativa.",
  C2: "Expressões avançadas e nuances para uso natural do inglês.",
};

export default function PracticePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoadingProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getUserProfile(user.uid);
        if (fetchedProfile) {
          setProfile(fetchedProfile);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil no PracticePage:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  const currentLevel = profile?.current_cefr_level || "A1";
  const lessons = useMemo(() => {
    return PRACTICE_LESSONS[currentLevel] || PRACTICE_LESSONS["A1"];
  }, [currentLevel]);

  useEffect(() => {
    if (lessonIndex >= lessons.length) {
      setLessonIndex(0);
    }
  }, [lessonIndex, lessons.length]);

  const activeLesson = lessons[lessonIndex];

  const handleSuccess = () => {
    if (lessonIndex >= lessons.length - 1) {
      setCompleted(true);
      setLessonIndex(0);
      return;
    }

    setLessonIndex((current) => current + 1);
    setCompleted(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-500">
      <header className="mb-10 md:flex md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-brand-cyan" />
            Lições Interativas
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl">
            Pratique inglês com lições adaptadas ao seu nível atual. Se você estiver logado, o sistema usa o seu nível CEFR para ajustar o conteúdo.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/80 p-6 shadow-2xl">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">
            <Globe className="w-4 h-4" />
            Nível Atual
          </div>
          <div className="text-4xl font-bold text-zinc-100">{currentLevel}</div>
          <p className="mt-2 text-zinc-400">{LEVEL_DESCRIPTION[currentLevel] || LEVEL_DESCRIPTION.A1}</p>
          {!user && (
            <p className="mt-4 text-sm text-brand-orange">Faça login para salvar seu progresso e ter lições mais personalizadas.</p>
          )}
        </div>
      </header>

      <div className="grid gap-8">
        <section className="bg-brand-gray/20 border border-zinc-800/50 rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Desafio de vocabulário</span>
              <h2 className="mt-3 text-2xl font-bold text-zinc-100">Complete a frase com a palavra correta</h2>
            </div>
            <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 px-5 py-4 text-zinc-100 shadow-inner">
              <p className="text-sm text-zinc-400">Lição</p>
              <p className="text-3xl font-semibold">{lessonIndex + 1} / {lessons.length}</p>
              {completed && <p className="mt-2 text-sm text-brand-cyan">Você completou todas as lições deste nível.</p>}
            </div>
          </div>

          <LessonProgress current={lessonIndex + 1} total={lessons.length} />

          <ActiveRecallChallenge
            sentenceParts={activeLesson.sentenceParts}
            options={activeLesson.options}
            correctOption={activeLesson.correctOption}
            onSuccess={handleSuccess}
            imageUrl={activeLesson.imageUrl}
          />

          <div className="mt-8 rounded-3xl border border-zinc-800/50 bg-zinc-950/80 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Vocabulário em foco</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-100">{activeLesson.english}</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/10 px-4 py-2 text-sm font-semibold text-brand-cyan">
                <ShieldCheck className="w-4 h-4" /> {activeLesson.portuguese}
              </span>
            </div>
            <p className="mt-4 text-zinc-400">Aprenda o significado e revise a frase para internalizar o inglês contextualizado. Continue praticando para reforçar a memória.</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {lessons.slice(0, 3).map((lesson) => (
            <ComprehensibleInputCard
              key={lesson.id}
              id={lesson.id}
              english={lesson.english}
              portuguese={lesson.portuguese}
              imageUrl={lesson.imageUrl}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
