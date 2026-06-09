"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import MoriMascot from "@/components/home/MoriMascot";
import { OperationPlan } from "@/types/operation";

type ApprovalModalProps = {
  plan: OperationPlan;
  isOpen: boolean;
  isExecuting: boolean;
  isComplete: boolean;
  onClose: () => void;
  onExecute: () => void;
};

function getExecutionSteps(type: OperationPlan["type"]) {
  if (type === "playlist") {
    return [
      "Checking Spotify connection",
      "Creating private playlist",
      "Searching professional seminar tracks",
      "Adding songs into playlist",
      "Returning Spotify playlist URL",
    ];
  }

  return [
    "Preparing workspace",
    "Creating recommendation package",
    "Preparing approval summary",
    "Locking sensitive action",
    "Returning execution result",
  ];
}

export default function ApprovalModal({
  plan,
  isOpen,
  isExecuting,
  isComplete,
  onClose,
  onExecute,
}: ApprovalModalProps) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [executionError, setExecutionError] = useState("");
  const [needsReconnect, setNeedsReconnect] = useState(false);

  async function handleRealExecute() {
    setExecutionError("");
    setPlaylistUrl("");
    setNeedsReconnect(false);

    if (plan.type !== "playlist") {
      onExecute();
      return;
    }

    try {
      onExecute();

      const response = await fetch("/api/spotify/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `SEO — ${plan.title}`,
        }),
      });

      const rawText = await response.text();

      const data = rawText
        ? (JSON.parse(rawText) as {
            success?: boolean;
            playlistUrl?: string;
            error?: string;
            connectUrl?: string;
            hint?: string;
          })
        : {
            success: false,
            error: "Empty response from Spotify API route.",
          };

      if (response.status === 401 && data.connectUrl) {
        window.location.href = data.connectUrl;
        return;
      }

      if (!response.ok || !data.success || !data.playlistUrl) {
        // 403 = missing scopes → prompt reconnect
        if (
          response.status === 403 ||
          data.error?.includes("403") ||
          data.hint
        ) {
          setNeedsReconnect(true);
        }
        throw new Error(data.error || "Spotify execution failed.");
      }

      // Success — store URL and immediately open the playlist in a new tab
      setPlaylistUrl(data.playlistUrl);
      window.open(data.playlistUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setExecutionError(
        error instanceof Error ? error.message : "Spotify execution failed.",
      );
    }
  }

  const executionSteps = getExecutionSteps(plan.type);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-seo-ink/30 px-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-seo-stone bg-seo-cream p-6 shadow-[0_32px_120px_rgba(34,39,31,0.28)]"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-seo-stone text-seo-muted transition hover:border-seo-forest hover:text-seo-forest"
              aria-label="Close approval modal"
            >
              <X size={17} />
            </button>

            {!isExecuting && !isComplete && (
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
                <div className="flex items-center justify-center">
                  <div className="scale-[0.78]">
                    <MoriMascot mode="thinking" />
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
                    Approval Gate
                  </p>

                  <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                    Ready to execute
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-seo-muted">
                    SEO has prepared the next action. Sensitive execution is
                    paused until you approve it.
                  </p>

                  <div className="mt-6 rounded-3xl border border-seo-stone bg-seo-paper/55 p-5">
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-seo-forest">
                      <Sparkles size={17} />
                      {plan.type === "playlist"
                        ? "Create Spotify playlist"
                        : "Approve recommended direction"}
                    </div>

                    <p className="text-sm leading-6 text-seo-muted">
                      {plan.title}
                    </p>
                  </div>

                  <div className="mt-4 rounded-3xl border border-seo-stone bg-seo-paper/55 p-5">
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-seo-forest">
                      <ShieldCheck size={17} />
                      Privacy check
                    </div>

                    <p className="text-sm leading-6 text-seo-muted">
                      {plan.type === "playlist"
                        ? "This will create a private Spotify playlist in your Spotify account."
                        : "This will prepare the execution package but will not make payment or booking."}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 md:flex-row">
                    <button
                      onClick={onClose}
                      className="rounded-full border border-seo-stone px-6 py-4 text-sm font-medium text-seo-muted transition hover:border-seo-forest hover:text-seo-forest"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleRealExecute}
                      className="rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss"
                    >
                      Approve & Execute
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isExecuting && !isComplete && (
              <div className="py-4 text-center">
                <div className="mx-auto flex justify-center scale-[0.75]">
                  <MoriMascot mode="thinking" />
                </div>

                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-seo-muted">
                  Executing
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                  SEO is carrying out the approved action.
                </h2>

                <div className="mx-auto mt-8 max-w-lg space-y-4 text-left">
                  {executionSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.45 }}
                      className="flex items-center gap-3 rounded-2xl border border-seo-stone bg-seo-paper/55 px-4 py-3 text-sm text-seo-muted"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                        <CheckCircle2 size={15} />
                      </div>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {isComplete && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                  <CheckCircle2 size={30} />
                </div>

                <p className="text-xs uppercase tracking-[0.35em] text-seo-muted">
                  Operation Complete
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                  {executionError ? "Action completed with an issue." : "Playlist created successfully."}
                </h2>

                {executionError ? (
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-red-500">
                    {executionError}
                  </p>
                ) : (
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-seo-muted">
                    Your Spotify playlist is ready. It should have opened in a
                    new tab — use the button below if it didn&apos;t.
                  </p>
                )}

                <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 md:flex-row md:justify-center">
                  {/* Success: show Open Playlist button */}
                  {playlistUrl && (
                    <a
                      href={playlistUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss"
                    >
                      Open Spotify Playlist
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {/* 403 / scope error: prompt reconnect */}
                  {needsReconnect && !playlistUrl && (
                    <a
                      href="/api/spotify/login"
                      className="flex items-center justify-center gap-2 rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss"
                    >
                      Reconnect Spotify
                      <ExternalLink size={15} />
                    </a>
                  )}

                  <button
                    onClick={onClose}
                    className="rounded-full border border-seo-stone px-6 py-4 text-sm font-medium text-seo-muted transition hover:border-seo-forest hover:text-seo-forest"
                  >
                    Return to operation
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-seo-stone bg-seo-paper/50 px-4 py-3 text-xs text-seo-muted">
              <LockKeyhole size={14} />
              SEO records this action in the audit trail and never executes
              sensitive actions silently.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}