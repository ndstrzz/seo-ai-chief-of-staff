"use client";

import { motion } from "framer-motion";

type MoriMascotProps = {
  mode?: "idle" | "thinking" | "complete";
};

export default function MoriMascot({ mode = "idle" }: MoriMascotProps) {
  const label =
    mode === "thinking"
      ? "Mori is thinking"
      : mode === "complete"
        ? "Mori completed the operation"
        : "Mori is idle";

  return (
    <motion.div
      className="mori-stage"
      aria-label={label}
      animate={{
        scale: mode === "thinking" ? 1.05 : 1,
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="mori-ring mori-ring-one" />
      <div className="mori-ring mori-ring-two" />

      <div className="mori-body-wrap">
        <div className="mori-head">
          <div className="mori-eye mori-eye-left" />
          <div className="mori-eye mori-eye-right" />
          <div className="mori-mouth-glow" />
        </div>

        <div className="mori-body" />
        <div className="mori-shadow" />
      </div>
    </motion.div>
  );
}