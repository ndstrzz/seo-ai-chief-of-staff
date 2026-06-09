"use client";

import {
  Cloud,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function InfrastructureCard() {
  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Infrastructure
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Cloud Native Agent Stack
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-seo-muted">
        SEO orchestrates specialist agents using a serverless architecture.
        Every recommendation can be researched, audited and safely approved
        before execution.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-seo-stone bg-seo-paper/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-seo-forest">
            <Cloud size={18} />
            <span className="font-medium">AWS API Gateway</span>
          </div>

          <p className="text-sm leading-6 text-seo-muted">
            Receives executive requests and routes them into the SEO agent
            network.
          </p>
        </div>

        <div className="rounded-3xl border border-seo-stone bg-seo-paper/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-seo-forest">
            <Server size={18} />
            <span className="font-medium">Lambda Agents</span>
          </div>

          <p className="text-sm leading-6 text-seo-muted">
            Planner, Research, Memory and Approval agents execute
            independently and asynchronously.
          </p>
        </div>

        <div className="rounded-3xl border border-seo-stone bg-seo-paper/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-seo-forest">
            <Database size={18} />
            <span className="font-medium">Executive Memory</span>
          </div>

          <p className="text-sm leading-6 text-seo-muted">
            DynamoDB stores operations, recommendations, reasoning history and
            executive preferences.
          </p>
        </div>

        <div className="rounded-3xl border border-seo-stone bg-seo-paper/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-seo-forest">
            <ShieldCheck size={18} />
            <span className="font-medium">Human Approval</span>
          </div>

          <p className="text-sm leading-6 text-seo-muted">
            Publishing, booking, payments and sensitive actions always pause
            for explicit executive approval.
          </p>
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-seo-moss bg-seo-soft p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-seo-muted">
          Architecture
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-seo-paper px-4 py-2">
            Vercel
          </span>

          <span className="rounded-full bg-seo-paper px-4 py-2">
            AWS API Gateway
          </span>

          <span className="rounded-full bg-seo-paper px-4 py-2">
            Lambda
          </span>

          <span className="rounded-full bg-seo-paper px-4 py-2">
            DynamoDB
          </span>

          <span className="rounded-full bg-seo-paper px-4 py-2">
            Exa
          </span>

          <span className="rounded-full bg-seo-paper px-4 py-2">
            Spotify
          </span>
        </div>
      </div>
    </GlassCard>
  );
}