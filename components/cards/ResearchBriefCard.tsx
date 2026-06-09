"use client";

import { ExternalLink, Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { ResearchBrief } from "@/types/operation";

type ResearchBriefCardProps = {
  brief: ResearchBrief;
};

export default function ResearchBriefCard({ brief }: ResearchBriefCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-5 flex items-center gap-2 text-seo-forest">
        <Search size={18} />
        <h2 className="text-2xl font-medium tracking-[-0.03em]">
          Research Brief
        </h2>
      </div>

      <p className="text-sm leading-6 text-seo-muted">{brief.summary}</p>

      <div className="mt-5 space-y-3">
        {brief.signals.map((signal) => (
          <div
            key={signal}
            className="rounded-2xl border border-seo-stone bg-seo-paper/50 p-3 text-sm leading-6 text-seo-muted"
          >
            {signal}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        {brief.sources.map((source) => (
          <a
            key={`${source.title}-${source.url}`}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-seo-stone bg-seo-cream/50 px-4 py-3 text-sm text-seo-muted transition hover:border-seo-moss hover:text-seo-forest"
          >
            <span className="line-clamp-1">{source.title}</span>
            <ExternalLink size={14} />
          </a>
        ))}
      </div>
    </GlassCard>
  );
}