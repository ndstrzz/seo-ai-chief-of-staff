"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Search,
  Sparkles,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationPlan } from "@/types/operation";

type AgentFeedProps = {
  plan: OperationPlan;
};

export default function AgentFeed({ plan }: AgentFeedProps) {
  const feed =
    plan.type === "playlist"
      ? [
          {
            time: "09:01",
            icon: Brain,
            title: "Planner Agent activated",
            description:
              "Operation decomposed into playlist research, music selection and approval workflow.",
            status: "complete",
          },
          {
            time: "09:02",
            icon: Search,
            title: "Research Agent prepared sources",
            description:
              "Exa retrieved event mood, audience preference and networking playlist references.",
            status: "complete",
          },
          {
            time: "09:03",
            icon: Sparkles,
            title: "Music Agent running",
            description:
              "Selecting songs that support networking and professional conversations.",
            status: "running",
          },
          {
            time: "09:04",
            icon: LockKeyhole,
            title: "Approval required",
            description: "Spotify publishing is classified as a sensitive action.",
            status: "locked",
          },
        ]
      : [
          {
            time: "09:01",
            icon: Brain,
            title: "Planner Agent activated",
            description: "Operation decomposed into venue, budget and approval workflows.",
            status: "complete",
          },
          {
            time: "09:02",
            icon: Search,
            title: "Research Agent prepared sources",
            description: "Exa collected venue capacities, pricing and accessibility information.",
            status: "complete",
          },
          {
            time: "09:03",
            icon: Sparkles,
            title: "Venue Agent running",
            description: "Ranking shortlisted venues against executive constraints.",
            status: "running",
          },
          {
            time: "09:04",
            icon: LockKeyhole,
            title: "Approval required",
            description: "Booking cannot proceed without executive confirmation.",
            status: "locked",
          },
        ];

  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
        Live Execution
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
        SEO is working
      </h2>

      <div className="mt-6 space-y-5">
        {feed.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.25 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    item.status === "complete"
                      ? "bg-seo-forest text-white"
                      : item.status === "running"
                        ? "bg-seo-moss text-white"
                        : "bg-seo-ink text-white"
                  }`}
                >
                  {item.status === "complete" ? (
                    <CheckCircle2 size={18} />
                  ) : item.status === "running" ? (
                    <Clock3 size={18} />
                  ) : (
                    <LockKeyhole size={18} />
                  )}
                </div>

                {index !== feed.length - 1 && (
                  <div className="mt-2 h-12 w-[2px] bg-seo-stone" />
                )}
              </div>

              <div className="flex-1 rounded-3xl border border-seo-stone bg-seo-paper/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-seo-forest" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>

                  <span className="text-xs text-seo-muted">{item.time}</span>
                </div>

                <p className="mt-3 text-sm leading-6 text-seo-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}