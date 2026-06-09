"use client";

import { Brain, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const memories = [
  "Prefers warm, professional event atmosphere",
  "Usually keeps seminar budget under $10,000",
  "Avoids high-distraction background music",
  "Prioritises MRT-accessible venues",
];

export default function ExecutiveMemory() {
  return (
    <GlassCard className="p-6">
      <div className="mb-5 flex items-center gap-2 text-seo-forest">
        <Brain size={18} />
        <h2 className="text-2xl font-medium tracking-[-0.03em]">
          Executive Memory
        </h2>
      </div>

      <div className="space-y-3">
        {memories.map((memory) => (
          <div
            key={memory}
            className="flex items-start gap-3 rounded-2xl border border-seo-stone bg-seo-paper/50 p-3 text-sm leading-6 text-seo-muted"
          >
            <CheckCircle2 size={15} className="mt-1 shrink-0 text-seo-forest" />
            {memory}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}