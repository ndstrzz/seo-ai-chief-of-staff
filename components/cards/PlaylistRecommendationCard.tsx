"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Music2,
  Sparkles,
  Timer,
  Waves,
} from "lucide-react";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { PlaylistRecommendation } from "@/types/operation";

type PlaylistRecommendationCardProps = {
  playlists: PlaylistRecommendation[];
  selectedPlaylist: PlaylistRecommendation | null;
  onSelectPlaylist: (playlist: PlaylistRecommendation) => void;
  onApprove: () => void;
};

export default function PlaylistRecommendationCard({
  playlists,
  selectedPlaylist,
  onSelectPlaylist,
  onApprove,
}: PlaylistRecommendationCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    playlists[0]?.id ?? null,
  );

  if (playlists.length === 0) {
    return null;
  }

  const hasSelection = Boolean(selectedPlaylist);

  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Recommendation
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Choose One Playlist
      </h2>

      <p className="mt-3 text-sm leading-6 text-seo-muted">
        Review each recommendation, open the song plan, then select one playlist
        for SEO to create in Spotify.
      </p>

      <div className="mt-6 space-y-4">
        {playlists.map((playlist, index) => {
          const isExpanded = expandedId === playlist.id;
          const isSelected = selectedPlaylist?.id === playlist.id;

          return (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * index }}
              className={`rounded-3xl border p-4 transition ${
                isSelected
                  ? "border-seo-forest bg-seo-forest/5 shadow-[0_18px_50px_rgba(48,67,45,0.13)]"
                  : "border-seo-stone bg-seo-paper/55"
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : playlist.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{playlist.name}</h3>

                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-seo-forest px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-seo-cream">
                        <CheckCircle2 size={11} />
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-seo-muted">
                    {playlist.reason}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-seo-forest text-seo-cream">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

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

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 rounded-3xl border border-seo-stone bg-seo-cream/45 p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-seo-forest">
                        <Sparkles size={15} />
                        More details
                      </div>

                      <p className="text-sm leading-6 text-seo-muted">
                        {playlist.details}
                      </p>

                      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-seo-muted">
                        Best for
                      </p>

                      <p className="mt-2 text-sm leading-6 text-seo-ink">
                        {playlist.bestFor}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-2">
                      {playlist.tracks.map((track) => (
                        <div
                          key={track.searchQuery}
                          className="rounded-2xl border border-seo-stone bg-seo-cream/50 px-3 py-3"
                        >
                          <p className="text-xs font-medium text-seo-ink">
                            {track.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-seo-muted">
                            {track.intent}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPlaylist(playlist)}
                      className={`mt-4 w-full rounded-full px-5 py-3 text-sm font-medium transition ${
                        isSelected
                          ? "bg-seo-moss text-seo-cream"
                          : "bg-seo-forest text-seo-cream hover:bg-seo-moss"
                      }`}
                    >
                      {isSelected ? "Selected for approval" : "Select this playlist"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={onApprove}
        disabled={!hasSelection}
        className="mt-5 w-full rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss disabled:cursor-not-allowed disabled:opacity-45"
      >
        Continue to approval
      </button>
    </GlassCard>
  );
}