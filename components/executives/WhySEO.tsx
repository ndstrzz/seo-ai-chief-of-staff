"use client";

import { BadgeCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationPlan } from "@/types/operation";

type WhySEOProps = {
  plan: OperationPlan;
};

export default function WhySEO({ plan }: WhySEOProps) {
  const reasons =
    plan.type === "playlist"
      ? [
          "Professional audience requires low-distraction music",
          "Warm networking atmosphere suits seminar arrival and break times",
          "Spotify publishing remains locked behind human approval",
          "Exa research signals support a calmer corporate event mood",
        ]
      : [
          "Capacity and budget constraints are the main decision factors",
          "Accessibility matters for a 250 pax event",
          "Recommendations remain separate from booking execution",
          "Exa research supports venue and activity comparison",
        ];

  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Explainability
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Why SEO chose this
      </h2>

      <div className="mt-5 rounded-3xl border border-seo-stone bg-seo-paper/55 p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-seo-forest">
          <BadgeCheck size={17} />
          Confidence
        </div>

        <p className="text-5xl font-medium tracking-[-0.06em] text-seo-forest">
          96%
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {reasons.map((reason) => (
          <div
            key={reason}
            className="flex items-start gap-3 rounded-2xl border border-seo-stone bg-seo-paper/50 p-3 text-sm leading-6 text-seo-muted"
          >
            <Sparkles size={15} className="mt-1 shrink-0 text-seo-forest" />
            {reason}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-seo-stone bg-seo-paper/45 p-3 text-xs text-seo-muted">
          <Search size={15} className="mb-2 text-seo-forest" />
          Exa Research
        </div>

        <div className="rounded-2xl border border-seo-stone bg-seo-paper/45 p-3 text-xs text-seo-muted">
          <Sparkles size={15} className="mb-2 text-seo-forest" />
          Planner Agent
        </div>

        <div className="rounded-2xl border border-seo-stone bg-seo-paper/45 p-3 text-xs text-seo-muted">
          <ShieldCheck size={15} className="mb-2 text-seo-forest" />
          Approval Gate
        </div>
      </div>
    </GlassCard>
  );
}