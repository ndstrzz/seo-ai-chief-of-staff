"use client";

import { CheckCircle2, CircleDot, History, Plus } from "lucide-react";
import { OperationPlan } from "@/types/operation";

type ExecutiveSidebarProps = {
  plan: OperationPlan;
};

const today = [
  { title: "Create LPA Playlist", status: "Running" },
  { title: "Venue Research", status: "Complete" },
  { title: "Birthday Campaign", status: "Complete" },
  { title: "New York Trip", status: "Complete" },
];

const yesterday = [
  "Client gift shortlist",
  "Insurance seminar notes",
  "Dinner booking research",
];

export default function ExecutiveSidebar({ plan }: ExecutiveSidebarProps) {
  return (
    <aside className="rounded-[2rem] border border-seo-stone bg-seo-cream/65 p-5 shadow-[0_24px_90px_rgba(48,67,45,0.1)] backdrop-blur-xl">
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.45em] text-seo-muted">SEO</p>
        <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
          AI Chief of Staff
        </h2>
        <p className="mt-2 text-sm leading-6 text-seo-muted">
          Quietly running your operation.
        </p>
      </div>

      <button className="mb-7 flex w-full items-center justify-center gap-2 rounded-full bg-seo-forest px-5 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss">
        <Plus size={16} />
        New Operation
      </button>

      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-seo-muted">
        <History size={14} />
        Today
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-seo-moss bg-seo-paper/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-seo-forest">
            <CircleDot size={15} />
            Current
          </div>
          <p className="text-sm leading-5">{plan.title}</p>
        </div>

        {today.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-2xl border border-seo-stone bg-seo-paper/45 px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-2">
              {item.status === "Running" ? (
                <CircleDot size={15} className="text-seo-forest" />
              ) : (
                <CheckCircle2 size={15} className="text-seo-muted" />
              )}
              <span>{item.title}</span>
            </div>

            <span className="text-xs text-seo-muted">{item.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-seo-muted">
          Yesterday
        </p>

        <div className="space-y-3">
          {yesterday.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-2xl border border-seo-stone bg-seo-paper/35 px-4 py-3 text-sm text-seo-muted"
            >
              <CheckCircle2 size={15} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}