"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Loader2, LockKeyhole, X } from "lucide-react";
import { OperationPlan, PlaylistRecommendation } from "@/types/operation";

type ApprovalModalProps = {
  plan: OperationPlan;
  selectedPlaylist?: PlaylistRecommendation | null;
  isOpen: boolean;
  isExecuting: boolean;
  isComplete: boolean;
  onClose: () => void;
  onExecute: () => void;
};

export default function ApprovalModal({
  plan,
  selectedPlaylist,
  isOpen,
  isExecuting,
  isComplete,
  onClose,
  onExecute,
}: ApprovalModalProps) {
  async function handleApproveAndExecute() {
    if (plan.type !== "playlist") {
      onExecute();
      return;
    }

    try {
      const response = await fetch("/api/spotify/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedPlaylist?.name || plan.title,
          playlist: selectedPlaylist,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Failed to create Spotify playlist.");
        return;
      }

      window.location.href = data.playlistUrl;
    } catch {
      alert("Failed to create Spotify playlist.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-seo-ink/25 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            className="relative w-full max-w-2xl rounded-[2rem] border border-seo-stone bg-seo-paper p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-seo-stone text-seo-muted transition hover:bg-seo-soft"
            >
              <X size={18} />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
              {isExecuting ? (
                <Loader2 size={28} className="animate-spin" />
              ) : (
                <CheckCircle2 size={28} />
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
                Approval Required
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                Approve this action?
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-seo-muted">
                SEO will only execute this action after your approval. For
                Spotify, SEO will create the selected playlist and open it
                directly in Spotify.
              </p>
            </div>

            <div className="mt-7 rounded-3xl border border-seo-stone bg-seo-cream/50 p-5">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-0.5 text-seo-forest" size={18} />

                <div>
                  <p className="text-sm font-medium text-seo-ink">
                    {plan.type === "playlist"
                      ? "Create Spotify playlist"
                      : "Execute approved operation"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-seo-muted">
                    {plan.type === "playlist"
                      ? selectedPlaylist?.name || "No playlist selected"
                      : plan.title}
                  </p>
                </div>
              </div>
            </div>

            {plan.type === "playlist" && selectedPlaylist && (
              <div className="mt-4 rounded-3xl border border-seo-stone bg-seo-paper/60 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-seo-muted">
                  Selected playlist
                </p>

                <h3 className="mt-2 text-lg font-medium">
                  {selectedPlaylist.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-seo-muted">
                  {selectedPlaylist.details}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-seo-stone px-6 py-4 text-sm font-medium text-seo-muted transition hover:bg-seo-soft"
              >
                Return to operation
              </button>

              <button
                onClick={handleApproveAndExecute}
                disabled={isExecuting || isComplete}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isExecuting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Executing
                  </>
                ) : (
                  <>
                    Approve & Execute
                    {plan.type === "playlist" && <ExternalLink size={16} />}
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-seo-stone bg-seo-cream/40 px-4 py-3 text-xs text-seo-muted">
              SEO records this action in the audit trail and never executes
              sensitive actions silently.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}