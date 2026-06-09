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
      "Preparing Spotify workspace",
      "Creating playlist structure",
      "Adding recommended track categories",
      "Saving playlist metadata",
      "Returning playlist preview link",
    ];
  }

  if (type === "travel") {
    return [
      "Preparing travel workspace",
      "Checking itinerary requirements",
      "Preparing traveller detail gate",
      "Creating approval summary",
      "Waiting before booking or payment",
    ];
  }

  return [
    "Preparing vendor workspace",
    "Creating recommendation package",
    "Preparing enquiry message",
    "Creating approval summary",
    "Waiting before booking or payment",
  ];
}

function getActionTitle(type: OperationPlan["type"]) {
  if (type === "playlist") return "Create Spotify playlist";
  if (type === "travel") return "Prepare travel booking";
  return "Approve recommended direction";
}

function getSensitiveAction(type: OperationPlan["type"]) {
  if (type === "playlist") {
    return "This will prepare a Spotify playlist workflow. Publishing to the real account will require Spotify connection.";
  }

  if (type === "travel") {
    return "This can prepare flight options, but passport access and payment remain locked behind approval.";
  }

  return "This can prepare vendor contact steps, but booking, deposits, and form submission remain locked behind approval.";
}

export default function ApprovalModal({
  plan,
  isOpen,
  isExecuting,
  isComplete,
  onClose,
  onExecute,
}: ApprovalModalProps) {
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
                      {getActionTitle(plan.type)}
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
                      {getSensitiveAction(plan.type)}
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
                      onClick={onExecute}
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
                  Approved action completed.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-seo-muted">
                  SEO completed the safe execution layer. Real external account
                  actions can be connected next through Spotify OAuth, browser
                  automation, or Stripe.
                </p>

                <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 md:flex-row md:justify-center">
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss"
                  >
                    Open workspace
                    <ExternalLink size={15} />
                  </a>

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