"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, LockKeyhole, Radio, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MoriMascot from "@/components/home/MoriMascot";

const agents = [
  { name: "Planner", status: "Complete" },
  { name: "Research", status: "Complete" },
  { name: "Venue", status: "Running" },
  { name: "Budget", status: "Running" },
  { name: "Spotify", status: "Queued" },
  { name: "Approval", status: "Locked" },
];

const timeline = [
  "Operation created",
  "Planner Agent decomposed objective",
  "Research Agent prepared Exa search queries",
  "Venue Agent evaluating suitable locations",
  "Budget Agent checking cost feasibility",
  "Human approval required before booking",
];

const venues = [
  {
    name: "Marina Bay Convention Hall",
    score: "92",
    reason: "Best balance of capacity, accessibility, and premium positioning.",
  },
  {
    name: "Suntec Seminar Suite",
    score: "88",
    reason: "Strong location, flexible room layout, and corporate-ready facilities.",
  },
  {
    name: "Lifelong Learning Institute Hall",
    score: "83",
    reason: "Cost-efficient and accessible, but less premium for high-end clients.",
  },
];

export default function OperationPage() {
  const searchParams = useSearchParams();
  const operation =
    searchParams.get("operation") ||
    "Organise an LPA seminar for 250 pax under $10,000";

  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <div className="seo-noise" />
      <div className="seo-orb seo-orb-one" />
      <div className="seo-orb seo-orb-two" />

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <div className="text-sm font-semibold tracking-[0.7em]">SEO</div>
        <div className="text-sm text-seo-muted">Mission Control</div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 pb-10 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-seo-stone bg-seo-cream/65 p-6 shadow-[0_24px_90px_rgba(48,67,45,0.12)] backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
            Current Operation
          </p>

          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.04em]">
            {operation}
          </h1>

          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between text-sm text-seo-muted">
              <span>Progress</span>
              <span>68%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-seo-soft">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-full rounded-full bg-seo-forest"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <MoriMascot mode="thinking" />
          </div>

          <div className="mt-6 rounded-3xl border border-seo-stone bg-seo-paper/50 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
              <LockKeyhole size={17} />
              Privacy-first execution
            </div>

            <p className="text-sm leading-6 text-seo-muted">
              SEO can research and prepare autonomously, but booking venues,
              making payments, or accessing sensitive data requires explicit
              approval.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-[2rem] border border-seo-stone bg-seo-cream/65 p-6 shadow-[0_24px_90px_rgba(48,67,45,0.1)] backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium">Agent Network</h2>
              <span className="rounded-full bg-seo-forest px-4 py-2 text-xs text-seo-cream">
                Live
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * index }}
                  className="rounded-3xl border border-seo-stone bg-seo-paper/55 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                      {agent.status === "Complete" ? (
                        <CheckCircle2 size={18} />
                      ) : agent.status === "Running" ? (
                        <Radio size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    <span className="text-xs text-seo-muted">
                      {agent.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium">{agent.name} Agent</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-[2rem] border border-seo-stone bg-seo-cream/65 p-6 shadow-[0_24px_90px_rgba(48,67,45,0.1)] backdrop-blur-xl"
            >
              <h2 className="mb-5 text-xl font-medium">Timeline</h2>

              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                      <Sparkles size={12} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">09:0{index}</p>
                      <p className="text-sm text-seo-muted">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-[2rem] border border-seo-stone bg-seo-cream/65 p-6 shadow-[0_24px_90px_rgba(48,67,45,0.1)] backdrop-blur-xl"
            >
              <h2 className="mb-5 text-xl font-medium">Venue Shortlist</h2>

              <div className="space-y-4">
                {venues.map((venue) => (
                  <div
                    key={venue.name}
                    className="rounded-3xl border border-seo-stone bg-seo-paper/55 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-medium">{venue.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-seo-muted">
                          {venue.reason}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-medium text-seo-forest">
                          {venue.score}
                        </p>
                        <p className="text-xs text-seo-muted">score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss">
                Approve recommended direction
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}