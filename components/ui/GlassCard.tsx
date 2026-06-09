import { ReactNode } from "react";
import clsx from "clsx";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        "rounded-[2rem] border border-seo-stone bg-seo-cream/65 shadow-[0_24px_90px_rgba(48,67,45,0.1)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}