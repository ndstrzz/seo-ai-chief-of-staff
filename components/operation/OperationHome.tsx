"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  History,
  LockKeyhole,
  Radio,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import SEOBackground from "@/components/background/SEOBackground";
import MoriMascot from "@/components/home/MoriMascot";
import {
  getOperationMemory,
  OperationMemoryItem,
  saveOperation,
} from "@/lib/operationMemory";
import { OperationPlan } from "@/types/operation";

const suggestions = [
  "Organise an LPA seminar for 250 pax under $10,000",
  "Create a corporate seminar Spotify playlist",
  "Plan a New York business trip today",
  "Research trending activities for a client event",
];

const liveSteps = [
  {
    icon: CheckCircle2,
    label: "Planner Agent activated",
  },
  {
    icon: Radio,
    label: "Research Agent preparing Exa query",
  },
  {
    icon: Clock3,
    label: "Execution agents queued",
  },
  {
    icon: LockKeyhole,
    label: "Approval gate enabled",
  },
];

export default function OperationHome() {
  const router = useRouter();
  const [operation, setOperation] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [memory, setMemory] = useState<OperationMemoryItem[]>([]);

  useEffect(() => {
    setMemory(getOperationMemory());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!operation.trim()) return;

    setIsThinking(true);

    const response = await fetch("/api/operations/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation }),
    });

    const data = (await response.json()) as {
      plan?: OperationPlan;
      error?: string;
    };

    if (!data.plan) {
      setIsThinking(false);
      alert(data.error ?? "SEO failed to create the operation.");
      return;
    }

    saveOperation(data.plan);

    setTimeout(() => {
      router.push(`/operation/${data.plan?.id}`);
    }, 1200);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <SEOBackground />

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <div className="text-sm font-semibold tracking-[0.7em]">SEO</div>

        <div className="hidden items-center gap-8 text-sm text-seo-muted md:flex">
          <span>Operations</span>
          <span>Workspace</span>
          <span>History</span>
          <span>Settings</span>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-8 px-6 pb-10 md:grid-cols-[0.95fr_1.05fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-seo-muted">
            Strategic Executive Orchestrator
          </p>

          <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.055em] md:text-7xl">
            Delegate once.
            <br />
            SEO quietly works.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-seo-muted md:text-lg">
            SEO plans, researches, coordinates, and prepares the operation —
            then waits for your approval before sensitive actions.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-2xl rounded-[2rem] border border-seo-stone bg-seo-cream/76 p-3 shadow-[0_28px_100px_rgba(48,67,45,0.15)] backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                value={operation}
                onChange={(event) => setOperation(event.target.value)}
                className="min-h-14 w-full bg-transparent px-5 text-sm text-seo-ink outline-none placeholder:text-seo-muted"
                placeholder="Type an operation for SEO..."
                disabled={isThinking}
              />

              <button
                type="submit"
                disabled={isThinking}
                className="flex items-center justify-center gap-2 rounded-full bg-seo-forest px-7 py-4 text-sm font-medium text-seo-cream transition hover:scale-[1.02] hover:bg-seo-moss disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isThinking ? "Researching" : "Start"}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setOperation(item)}
                disabled={isThinking}
                className="rounded-full border border-seo-stone bg-seo-cream/45 px-4 py-2 text-xs text-seo-muted transition hover:border-seo-moss hover:text-seo-forest disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>

          {memory.length > 0 && (
            <div className="mt-8 max-w-2xl rounded-[2rem] border border-seo-stone bg-seo-cream/50 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-seo-forest">
                <History size={17} />
                Executive Memory
              </div>

              <div className="space-y-3">
                {memory.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => router.push(`/operation/${item.id}`)}
                    className="flex w-full items-center justify-between rounded-2xl border border-seo-stone bg-seo-paper/45 px-4 py-3 text-left text-sm transition hover:border-seo-moss"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-seo-muted">
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="relative flex min-h-[620px] flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9 }}
        >
          <div className="absolute inset-0 rounded-full bg-seo-moss/5 blur-3xl" />

          <motion.div
            animate={{
              y: isThinking ? -12 : 0,
              scale: isThinking ? 1.06 : 1,
            }}
            transition={{ duration: 0.7 }}
            className="relative z-10 scale-[1.22] md:scale-[1.38]"
          >
            <MoriMascot mode={isThinking ? "thinking" : "idle"} />
          </motion.div>

          <AnimatePresence mode="wait">
            {isThinking ? (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="relative z-20 mt-14 w-full max-w-md rounded-[2rem] border border-seo-stone bg-seo-cream/72 p-5 text-left shadow-[0_24px_90px_rgba(48,67,45,0.12)] backdrop-blur-xl"
              >
                <p className="mb-4 text-xs uppercase tracking-[0.32em] text-seo-muted">
                  Live Operation Boot
                </p>

                <div className="space-y-4">
                  {liveSteps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.25 }}
                        className="flex items-center gap-3 text-sm text-seo-muted"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                          <Icon size={15} />
                        </div>

                        <span>{step.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="relative z-20 mt-14 rounded-full border border-seo-stone bg-seo-cream/65 px-6 py-3 text-sm text-seo-muted shadow-[0_18px_50px_rgba(48,67,45,0.08)] backdrop-blur-xl"
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