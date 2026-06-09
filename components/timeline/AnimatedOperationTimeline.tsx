"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, LockKeyhole, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationTimelineItem } from "@/types/operation";

type AnimatedOperationTimelineProps = {
  items: OperationTimelineItem[];
};

function getIcon(status: string) {
  if (status === "done") return <CheckCircle2 size={13} />;
  if (status === "locked") return <LockKeyhole size={13} />;
  if (status === "running") return <CircleDashed size={13} />;
  return <Sparkles size={13} />;
}

export default function AnimatedOperationTimeline({
  items,
}: AnimatedOperationTimelineProps) {
  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Live Execution
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        SEO is working
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item, index) => {
          const isRunning = item.status === "running";

          return (
            <motion.div
              key={`${item.time}-${item.title}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.45, duration: 0.45 }}
              className="relative flex gap-3"
            >
              {index !== items.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "calc(100% + 20px)" }}
                  transition={{ delay: index * 0.45 + 0.2, duration: 0.5 }}
                  className="absolute left-[13px] top-8 w-px bg-seo-stone"
                />
              )}

              <motion.div
                animate={
                  isRunning
                    ? {
                        scale: [1, 1.18, 1],
                        opacity: [0.75, 1, 0.75],
                      }
                    : undefined
                }
                transition={
                  isRunning
                    ? {
                        duration: 1.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
                className={`relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  item.status === "locked"
                    ? "bg-seo-ink text-seo-cream"
                    : item.status === "running"
                      ? "bg-seo-moss text-seo-cream"
                      : "bg-seo-forest text-seo-cream"
                }`}
              >
                {getIcon(item.status)}
              </motion.div>

              <div>
                <p className="text-xs text-seo-muted">{item.time}</p>
                <p className="text-sm font-medium text-seo-ink">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-seo-muted">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}