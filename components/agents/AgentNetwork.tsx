"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, LockKeyhole, Radio } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { OperationAgent } from "@/types/operation";

type AgentNetworkProps = {
  agents: OperationAgent[];
};

function getIcon(status: string) {
  if (status === "Complete") return <CheckCircle2 size={18} />;
  if (status === "Running") return <Radio size={18} />;
  if (status === "Locked") return <LockKeyhole size={18} />;
  return <Clock3 size={18} />;
}

function getStatusClass(status: string) {
  if (status === "Complete") {
    return "bg-seo-forest text-seo-cream shadow-[0_0_30px_rgba(48,67,45,0.28)]";
  }

  if (status === "Running") {
    return "bg-seo-moss text-seo-cream shadow-[0_0_36px_rgba(91,112,83,0.42)]";
  }

  if (status === "Locked") {
    return "bg-seo-ink text-seo-cream";
  }

  return "bg-seo-soft text-seo-muted";
}

export default function AgentNetwork({ agents }: AgentNetworkProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
            Orchestration
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
            Agent Network
          </h2>
        </div>

        <span className="rounded-full bg-seo-forest px-4 py-2 text-xs text-seo-cream">
          Live
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {agents.map((agent, index) => {
          const isRunning = agent.status === "Running";

          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * index }}
              className="relative overflow-hidden rounded-3xl border border-seo-stone bg-seo-paper/55 p-4"
            >
              {isRunning && (
                <motion.div
                  className="absolute inset-0 bg-seo-moss/10"
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}

              <div className="relative z-10 mb-4 flex items-center justify-between">
                <motion.div
                  animate={
                    isRunning
                      ? {
                          scale: [1, 1.08, 1],
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
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${getStatusClass(
                    agent.status,
                  )}`}
                >
                  {getIcon(agent.status)}
                </motion.div>

                <span className="text-xs text-seo-muted">{agent.status}</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-sm font-medium">{agent.name} Agent</h3>
                <p className="mt-2 text-xs leading-5 text-seo-muted">
                  {agent.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}