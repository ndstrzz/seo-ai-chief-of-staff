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
        scale: mode === "thinking" ? 1.04 : 1,
        rotate: mode === "thinking" ? [0, -1.5, 1.5, 0] : 0,
      }}
      transition={{
        duration: mode === "thinking" ? 1.6 : 0.6,
        repeat: mode === "thinking" ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div className="mori-ring mori-ring-one" />
      <div className="mori-ring mori-ring-two" />
      <div className="mori-ring mori-ring-three" />

      <div className="mori-body-wrap">
        <div className="mori-head">
          <div className="mori-eye mori-eye-left" />
          <div className="mori-eye mori-eye-right" />
          <div className="mori-mouth-glow" />
        </div>

        <div className="mori-body" />
        <div className="mori-shadow" />
      </div>

      <div className="mori-particle mori-particle-one" />
      <div className="mori-particle mori-particle-two" />
      <div className="mori-particle mori-particle-three" />
    </motion.div>
  );
}