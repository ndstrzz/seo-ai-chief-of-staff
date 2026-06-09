"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, LockKeyhole, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationTimelineItem } from "@/types/operation";

type OperationTimelineProps = {
  items: OperationTimelineItem[];
};

function getIcon(status: string) {
  if (status === "done") return <CheckCircle2 size={13} />;
  if (status === "locked") return <LockKeyhole size={13} />;
  if (status === "running") return <CircleDashed size={13} />;
  return <Sparkles size={13} />;
}

export default function OperationTimeline({ items }: OperationTimelineProps) {
  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Audit Trail
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Live Timeline
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item, index) => {
          const isRunning = item.status === "running";

          return (
            <motion.div
              key={`${item.time}-${item.title}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex gap-3"
            >
              <motion.div
                animate={
                  isRunning
                    ? {
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                    : undefined
                }
                transition={
                  isRunning
                    ? {
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
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
                <p className="text-sm font-medium">{item.time}</p>
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