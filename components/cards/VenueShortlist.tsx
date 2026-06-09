"use client";

import { motion } from "framer-motion";
import { MapPin, Users, WalletCards } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { VenueRecommendation } from "@/types/operation";

type VenueShortlistProps = {
  venues: VenueRecommendation[];
};

export default function VenueShortlist({ venues }: VenueShortlistProps) {
  return (
    <GlassCard className="p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-seo-muted">
        Recommendation
      </p>

      <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
        Venue Shortlist
      </h2>

      <div className="mt-6 space-y-4">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index }}
            className="rounded-3xl border border-seo-stone bg-seo-paper/55 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium">{venue.name}</h3>

                <p className="mt-2 text-sm leading-6 text-seo-muted">
                  {venue.reason}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-medium tracking-[-0.05em] text-seo-forest">
                  {venue.score}
                </p>
                <p className="text-xs text-seo-muted">score</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <Users size={13} />
                {venue.capacity}
              </span>

              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <WalletCards size={13} />
                {venue.budget}
              </span>

              <span className="flex items-center gap-1 rounded-full border border-seo-stone bg-seo-cream/60 px-3 py-1 text-xs text-seo-muted">
                <MapPin size={13} />
                {venue.access}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-5 w-full rounded-full bg-seo-forest px-6 py-4 text-sm font-medium text-seo-cream transition hover:bg-seo-moss">
        Approve recommended direction
      </button>
    </GlassCard>
  );
}