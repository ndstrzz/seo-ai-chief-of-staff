"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import MoriMascot from "@/components/home/MoriMascot";

const suggestions = [
  "Organise an LPA seminar for 250 pax under $10,000",
  "Create a corporate seminar Spotify playlist",
  "Plan a New York business trip today",
  "Research trending activities for a client event",
];

const recentOperations = [
  {
    title: "LPA Seminar Planning",
    status: "Research-ready",
  },
  {
    title: "Client Birthday Campaign",
    status: "Approval required",
  },
  {
    title: "New York Business Trip",
    status: "Draft itinerary",
  },
];

export default function OperationHome() {
  const [operation, setOperation] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [createdOperation, setCreatedOperation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!operation.trim()) return;

    setIsThinking(true);
    setCreatedOperation(operation);

    setTimeout(() => {
      setIsThinking(false);
    }, 1800);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <div className="seo-noise" />
      <div className="seo-orb seo-orb-one" />
      <div className="seo-orb seo-orb-two" />
      <div className="seo-orb seo-orb-three" />

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <div className="text-sm font-semibold tracking-[0.7em]">SEO</div>

        <div className="hidden items-center gap-6 text-sm text-seo-muted md:flex">
          <span>Operations</span>
          <span>Workspace</span>
          <span>History</span>
          <span>Settings</span>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-6 pb-12 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-seo-muted">
            Strategic Executive Orchestrator
          </p>

          <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-[-0.045em] md:text-7xl">
            Delegate the operation. Let SEO quietly execute.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-seo-muted md:text-lg">
            SEO plans, researches, compares, prepares, and pauses for approval
            before sensitive actions.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-2xl rounded-[2rem] border border-seo-stone bg-seo-cream/70 p-3 shadow-[0_24px_90px_rgba(48,67,45,0.14)] backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                value={operation}
                onChange={(event) => setOperation(event.target.value)}
                className="min-h-14 w-full bg-transparent px-5 text-sm text-seo-ink outline-none placeholder:text-seo-muted"
                placeholder="Give SEO an operation..."
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-seo-forest px-7 py-4 text-sm font-medium text-seo-cream transition hover:scale-[1.02] hover:bg-seo-moss"
              >
                Start
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setOperation(item)}
                className="rounded-full border border-seo-stone bg-seo-cream/50 px-4 py-2 text-xs text-seo-muted transition hover:border-seo-moss hover:text-seo-forest"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {recentOperations.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-seo-stone bg-seo-cream/55 p-5 shadow-[0_18px_50px_rgba(48,67,45,0.08)] backdrop-blur-xl"
              >
                <p className="mb-3 text-[0.62rem] uppercase tracking-[0.28em] text-seo-muted">
                  Recent
                </p>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="mt-3 text-xs text-seo-muted">{item.status}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <MoriMascot mode={isThinking ? "thinking" : "idle"} />

          <AnimatePresence mode="wait">
            {isThinking ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-full border border-seo-stone bg-seo-cream/65 px-5 py-3 text-sm text-seo-muted shadow-[0_18px_50px_rgba(48,67,45,0.08)] backdrop-blur-xl"
              >
                SEO is decomposing the operation...
              </motion.div>
            ) : createdOperation ? (
              <motion.div
                key="created"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 w-full max-w-md rounded-3xl border border-seo-stone bg-seo-cream/70 p-5 text-left shadow-[0_24px_90px_rgba(48,67,45,0.12)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-seo-forest">
                  <CheckCircle2 size={18} />
                  Operation created
                </div>

                <h3 className="text-lg font-medium">{createdOperation}</h3>

                <div className="mt-5 space-y-3 text-sm text-seo-muted">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} />
                    Planner Agent ready
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} />
                    Research Agent queued
                  </div>
                  <div className="flex items-center gap-2">
                    <LockKeyhole size={16} />
                    Sensitive actions require approval
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-full border border-seo-stone bg-seo-cream/65 px-5 py-3 text-sm text-seo-muted shadow-[0_18px_50px_rgba(48,67,45,0.08)] backdrop-blur-xl"
              >
                Mori is waiting quietly.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}