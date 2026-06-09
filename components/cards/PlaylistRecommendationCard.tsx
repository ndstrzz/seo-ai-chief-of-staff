"use client";

import { motion } from "framer-motion";
import { Music2, Timer, Waves } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { PlaylistRecommendation } from "@/types/operation";

type PlaylistRecommendationCardProps = {
  playlists: PlaylistRecommendation[];
};

export default function PlaylistRecommendationCard({
  playlists,
}: PlaylistRecommendationCardProps) {
  if (playlists.length === 0) {
    return null;
  }

  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Recommendation
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Playlist Direction
      </h2>

      <div className="mt-6 space-y-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index }}
            className="rounded-3xl border border-seo-stone bg-seo-paper/55 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium">{playlist.name}</h3>

                <p className="mt-2 text-sm leading-6 text-seo-muted">
                  {playlist.reason}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                <Music2 size={18} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <Waves size={13} />
                {playlist.mood}
              </span>

              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <Timer size={13} />
                {playlist.duration}
              </span>

              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <Music2 size={13} />
                {playlist.trackCount}
              </span>
            </div>

            <div className="mt-4 grid gap-2">
              {playlist.tracks.map((track) => (
                <div
                  key={track}
                  className="rounded-2xl border border-seo-stone bg-seo-cream/50 px-3 py-2 text-xs text-seo-muted"
                >
                  {track}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-5 w-full rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss">
        Approve playlist direction
      </button>
    </GlassCard>
  );
}