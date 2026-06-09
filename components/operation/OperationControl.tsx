"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AgentNetwork from "@/components/agents/AgentNetwork";
import ApprovalModal from "@/components/approval/ApprovalModal";
import SEOBackground from "@/components/background/SEOBackground";
import InfrastructureCard from "@/components/cards/InfrastructureCard";
import PlaylistRecommendationCard from "@/components/cards/PlaylistRecommendationCard";
import ResearchBriefCard from "@/components/cards/ResearchBriefCard";
import VenueShortlist from "@/components/cards/VenueShortlist";
import AgentFeed from "@/components/executives/AgentFeed";
import ExecutiveMemory from "@/components/executives/ExecutiveMemory";
import ExecutiveSidebar from "@/components/executives/ExecutiveSidebar";
import WhySEO from "@/components/executives/WhySEO";
import MoriMascot from "@/components/home/MoriMascot";
import TopNav from "@/components/navigation/TopNav";
import AnimatedOperationTimeline from "@/components/timeline/AnimatedOperationTimeline";
import GlassCard from "@/components/ui/GlassCard";
import { createOperationPlan } from "@/lib/createOperationPlan";
import { OperationPlan, PlaylistRecommendation } from "@/types/operation";

export default function OperationControl() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<OperationPlan | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<PlaylistRecommendation | null>(null);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    async function loadOperation() {
      const stored = localStorage.getItem(`seo-operation-${params.id}`);

      if (stored) {
        const storedPlan = JSON.parse(stored) as OperationPlan;
        setPlan(storedPlan);

        if (storedPlan.type === "playlist" && storedPlan.playlists[0]) {
          setSelectedPlaylist(storedPlan.playlists[0]);
        }

        return;
      }

      const response = await fetch(`/api/operations/${params.id}`);

      if (response.ok) {
        const data = (await response.json()) as {
          plan: OperationPlan;
        };

        localStorage.setItem(
          `seo-operation-${data.plan.id}`,
          JSON.stringify(data.plan),
        );

        setPlan(data.plan);

        if (data.plan.type === "playlist" && data.plan.playlists[0]) {
          setSelectedPlaylist(data.plan.playlists[0]);
        }

        return;
      }

      const fallbackPlan = createOperationPlan(
        "Organise an LPA seminar for 250 pax under $10,000",
      );

      setPlan(fallbackPlan);
    }

    loadOperation();
  }, [params.id]);

  function handleOpenApproval() {
    if (plan?.type === "playlist" && !selectedPlaylist) {
      alert("Please select one Spotify playlist first.");
      return;
    }

    setIsApprovalOpen(true);
    setIsExecuting(false);
    setIsComplete(false);
  }

  function handleCloseApproval() {
    setIsApprovalOpen(false);
    setIsExecuting(false);
    setIsComplete(false);
  }

  function handleExecute() {
    setIsExecuting(true);

    setTimeout(() => {
      setIsComplete(true);
      setIsExecuting(false);
    }, 3200);
  }

  if (!plan) {
    return null;
  }

  const actionLabel =
    plan.type === "playlist"
      ? "Spotify publishing requires playlist selection and approval"
      : "Booking requires approval";

  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <SEOBackground />
      <TopNav label="Executive Workspace" />

      <section className="relative z-10 mx-auto grid max-w-[1500px] gap-6 px-6 pb-10 md:grid-cols-[310px_0.9fr_1.1fr] md:px-10">
        <ExecutiveSidebar plan={plan} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          <GlassCard className="p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
              Current Operation
            </p>

            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.045em]">
              {plan.title}
            </h1>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between text-sm text-seo-muted">
                <span>Execution Progress</span>
                <span>{plan.progress}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-seo-soft">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${plan.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="h-full rounded-full bg-seo-forest"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="scale-[0.82]">
                <MoriMascot mode="thinking" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl border border-seo-stone bg-seo-paper/50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
                  <ShieldCheck size={17} />
                  Human-in-the-loop protection
                </div>

                <p className="text-sm leading-6 text-seo-muted">
                  SEO can research and prepare autonomously, but publishing,
                  booking, payments, or sensitive data access require explicit
                  approval.
                </p>
              </div>

              <div className="rounded-3xl border border-seo-stone bg-seo-paper/50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
                  <LockKeyhole size={17} />
                  Sensitive action gate
                </div>

                <div className="space-y-3 text-sm text-seo-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    Research allowed automatically
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    Recommendations generated safely
                  </div>

                  <div className="flex items-center gap-2">
                    <LockKeyhole size={15} />
                    {actionLabel}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <ExecutiveMemory />
          <WhySEO plan={plan} />
        </motion.div>

        <div className="grid gap-6">
          <AgentNetwork agents={plan.agents} />
          <AgentFeed plan={plan} />

          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <AnimatedOperationTimeline items={plan.timeline} />

            {plan.type === "playlist" ? (
              <PlaylistRecommendationCard
                playlists={plan.playlists}
                selectedPlaylist={selectedPlaylist}
                onSelectPlaylist={setSelectedPlaylist}
                onApprove={handleOpenApproval}
              />
            ) : (
              <VenueShortlist
                venues={plan.venues}
                onApprove={handleOpenApproval}
              />
            )}
          </div>

          <ResearchBriefCard brief={plan.researchBrief} />
          <InfrastructureCard />
        </div>
      </section>

      <ApprovalModal
        plan={plan}
        selectedPlaylist={selectedPlaylist}
        isOpen={isApprovalOpen}
        isExecuting={isExecuting}
        isComplete={isComplete}
        onClose={handleCloseApproval}
        onExecute={handleExecute}
      />
    </main>
  );
}