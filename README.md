# 🧠 Neuro-Language Tracker

Um aplicativo web projetado para rastrear e facilitar o aprendizado de inglês, guiando o usuário do zero (iniciante absoluto A1) até a fluência natural (compreensão de memória procedural C2).

## 🎯 Objetivo Principal

O objetivo central desta aplicação não é apenas ensinar inglês, mas sim **hackear a aquisição de linguagem através da neurociência**. A filosofia principal baseia-se em transformar a *memória declarativa* (conhecimento consciente de regras e palavras) em *memória procedural* (uso automático e subconsciente da língua). 

Isso é alcançado através de três pilares:
1. **Mass Comprehensible Input (Volume Massivo de Entrada Compreensível):** Exposição constante ao idioma.
2. **Active Recall (Recordação Ativa) & Repetição Espaçada:** Otimização do fortalecimento sináptico (mielinização).
3. **Strict Time-Tracking (Rastreamento Rigoroso de Tempo):** Rumo ao "Ponto de Não Retorno", uma marca científica estimada em aproximadamente **1.200 horas** de imersão para alcançar a neuro-fluência.

## 🚀 Principais Funcionalidades

### 1. Neuro-Tracker Dashboard
- Um painel altamente visual que centraliza as horas de estudo logadas.
- Representação gráfica do progresso do usuário rumo à marca de 1.200 horas.
- Lógica de progressão de níveis CEFR (Quadro Europeu Comum de Referência) baseada no tempo de estudo e maestria de vocabulário:
  - **A1** (Iniciante)
  - **A2** (Básico)
  - **B1** (Intermediário)
  - **B2** (Pós-Intermediário)
  - **C1** (Avançado)
  - **C2** (Fluência Total/Nativo)

### 2. Study Session Logger (Rastreador de Sessões)
- Uma ferramenta de registro de tempo (cronômetro ou entrada manual) para registrar cada interação diária com o idioma.
- Categorização inteligente das sessões:
  - *Comprehensible Input* (ex: Podcasts, Vídeos, Leitura)
  - *Active Recall* (ex: Repetição espaçada, Flashcards)
  - *Grammar / Estrutura*

### 3. Vocabulary Vault (Cofre de Vocabulário)
- Sistema voltado para repetição espaçada.
- Todo vocabulário é obrigatoriamente ligado a **frases de contexto** (a neurociência comprova que o contexto constrói mielina e consolida a memória muito mais rápido do que traduções isoladas).

### 4. Sistema de Autenticação (Segurança)
- Login e registro seguros utilizando Firebase Auth (Email/Senha e Google OAuth).
- Rotas protegidas (Middleware do Next.js).

## 🛠️ Stack Tecnológica (Tech Stack)

A aplicação foi construída visando alta performance, modularidade e design moderno:

- **Frontend:** Next.js (App Router), React, Tailwind CSS (Design focado em Dark Mode), Lucide React (Ícones).
- **Backend & Database:** Firebase (Firestore para modelagem de dados NoSQL e Firebase Auth para gerenciamento de usuários).
- **State Management (Gerenciamento de Estado):** Zustand.
- **Linguagem:** TypeScript (Garantindo tipagem estática e redução de bugs).

> **Nota de Desenvolvimento:** Toda a interface e textos voltados para o usuário (UI) são em **Português do Brasil (PT-BR)**, enquanto a base de código, variáveis, estrutura de pastas e schema do banco de dados são em **Inglês**.

## 🗄️ Arquitetura de Dados (Firebase Firestore)

O banco de dados é estruturado de forma não relacional com as seguintes coleções principais:

- `users`: Armazena dados do perfil, nível atual do CEFR e soma total de minutos de estudo.
- `study_sessions`: Registra cada sessão de estudo individual, vinculada ao usuário, tipo de sessão, duração e anotações.
- `vocabulary_vault`: Armazena as palavras aprendidas com frases de contexto, tradução, data de revisão (para repetição espaçada) e nível de domínio (*mastery level*).

---
*Este projeto aplica conceitos validados por linguistas e neurocientistas para garantir que o tempo investido seja revertido na fluência real.*
