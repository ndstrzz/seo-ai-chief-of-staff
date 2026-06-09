"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        `
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-seo-stone
        bg-seo-cream/60
        backdrop-blur-2xl
        shadow-[0_20px_80px_rgba(32,47,29,0.08)]
        transition-all
        duration-300
        hover:shadow-[0_24px_90px_rgba(32,47,29,0.12)]
      `,
        className,
      )}
      {...props}
    >
      {/* soft paper highlight */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/30
          via-transparent
          to-transparent
        "
      />

      {/* subtle moss glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-seo-moss/10
          blur-3xl
        "
      />

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}