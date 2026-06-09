"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, LockKeyhole } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationPlan } from "@/types/operation";

type LiveAgentFeedProps = {
  plan: OperationPlan;
};

export default function LiveAgentFeed({ plan }: LiveAgentFeedProps) {
  const feed =
    plan.type === "playlist"
      ? [
          "Planner understood playlist objective",
          "Research Agent queried Exa",
          "Music Agent selected seminar mood",
          "Spotify Agent waiting for approval",
          "Approval Agent locked sensitive execution",
        ]
      : [
          "Planner decomposed event objective",
          "Research Agent queried Exa",
          "Venue Agent scored recommendations",
          "Budget Agent checked constraints",
          "Approval Agent locked booking execution",
        ];

  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Live Agent Feed
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Orchestration Log
      </h2>

      <div className="mt-6 space-y-4">
        {feed.map((item, index) => {
          const isLast = index === feed.length - 1;

          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.35 }}
              className="flex items-center gap-3 rounded-2xl border border-seo-stone bg-seo-paper/50 px-4 py-3 text-sm text-seo-muted"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isLast
                    ? "bg-seo-ink text-seo-cream"
                    : index === feed.length - 2
                      ? "bg-seo-moss text-seo-cream"
                      : "bg-seo-forest text-seo-cream"
                }`}
              >
                {isLast ? (
                  <LockKeyhole size={14} />
                ) : index === feed.length - 2 ? (
                  <CircleDashed size={14} />
                ) : (
                  <CheckCircle2 size={14} />
                )}
              </div>

              <span>{item}</span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}