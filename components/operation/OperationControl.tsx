"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AgentNetwork from "@/components/agents/AgentNetwork";
import SEOBackground from "@/components/background/SEOBackground";
import VenueShortlist from "@/components/cards/VenueShortlist";
import MoriMascot from "@/components/home/MoriMascot";
import TopNav from "@/components/navigation/TopNav";
import AnimatedOperationTimeline from "@/components/timeline/AnimatedOperationTimeline";
import GlassCard from "@/components/ui/GlassCard";
import { createOperationPlan } from "@/lib/createOperationPlan";
import { OperationPlan } from "@/types/operation";

export default function OperationControl() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<OperationPlan | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`seo-operation-${params.id}`);

    if (stored) {
      setPlan(JSON.parse(stored));
      return;
    }

    setPlan(
      createOperationPlan("Organise an LPA seminar for 250 pax under $10,000"),
    );
  }, [params.id]);

  if (!plan) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <SEOBackground />
      <TopNav label="Mission Control" />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 pb-10 md:grid-cols-[0.88fr_1.12fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
              Current Operation
            </p>

            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.045em]">
              {plan.title}
            </h1>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between text-sm text-seo-muted">
                <span>Execution Progress</span>
                <span>{plan.progress}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-seo-soft">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${plan.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="h-full rounded-full bg-seo-forest"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="scale-[0.9]">
                <MoriMascot mode="thinking" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl border border-seo-stone bg-seo-paper/50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
                  <ShieldCheck size={17} />
                  Human-in-the-loop protection
                </div>

                <p className="text-sm leading-6 text-seo-muted">
                  SEO can research and prepare autonomously, but booking venues,
                  making payments, or accessing sensitive data requires explicit
                  approval.
                </p>
              </div>

              <div className="rounded-3xl border border-seo-stone bg-seo-paper/50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
                  <LockKeyhole size={17} />
                  Sensitive action gate
                </div>

                <div className="space-y-3 text-sm text-seo-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    Research allowed automatically
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    Recommendations generated safely
                  </div>

                  <div className="flex items-center gap-2">
                    <LockKeyhole size={15} />
                    Booking requires approval
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid gap-6">
          <AgentNetwork agents={plan.agents} />

          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <AnimatedOperationTimeline items={plan.timeline} />
            <VenueShortlist venues={plan.venues} />
          </div>
        </div>
      </section>
    </main>
  );
}