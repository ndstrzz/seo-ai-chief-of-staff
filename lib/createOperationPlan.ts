import {
  OperationAgent,
  OperationPlan,
  OperationTimelineItem,
  OperationType,
  PlaylistRecommendation,
  ResearchBrief,
  VenueRecommendation,
} from "@/types/operation";

type CreateOperationPlanOptions = {
  researchBrief?: ResearchBrief;
};

function detectOperationType(title: string): OperationType {
  const lowered = title.toLowerCase();

  if (
    lowered.includes("spotify") ||
    lowered.includes("playlist") ||
    lowered.includes("music") ||
    lowered.includes("song")
  ) {
    return "playlist";
  }

  if (
    lowered.includes("flight") ||
    lowered.includes("trip") ||
    lowered.includes("travel") ||
    lowered.includes("hotel")
  ) {
    return "travel";
  }

  if (
    lowered.includes("seminar") ||
    lowered.includes("event") ||
    lowered.includes("venue") ||
    lowered.includes("conference")
  ) {
    return "seminar";
  }

  return "general";
}

function createAgents(type: OperationType): OperationAgent[] {
  if (type === "playlist") {
    return [
      {
        name: "Planner",
        status: "Complete",
        description: "Identified the playlist purpose and event context.",
      },
      {
        name: "Research",
        status: "Complete",
        description: "Prepared mood and audience research for Exa.",
      },
      {
        name: "Music",
        status: "Running",
        description: "Curating songs by mood, energy, and professionalism.",
      },
      {
        name: "Spotify",
        status: "Running",
        description: "Preparing playlist creation workflow.",
      },
      {
        name: "Approval",
        status: "Locked",
        description: "Publishing to Spotify requires user approval.",
      },
      {
        name: "Memory",
        status: "Queued",
        description: "Saving music preference for future operations.",
      },
    ];
  }

  if (type === "travel") {
    return [
      {
        name: "Planner",
        status: "Complete",
        description: "Travel objective split into flight, hotel, and itinerary.",
      },
      {
        name: "Research",
        status: "Complete",
        description: "Prepared live travel research queries.",
      },
      {
        name: "Flight",
        status: "Running",
        description: "Comparing routes, timing, layovers, and estimated cost.",
      },
      {
        name: "Hotel",
        status: "Queued",
        description: "Waiting to compare hotel options.",
      },
      {
        name: "Approval",
        status: "Locked",
        description: "Booking and payment require explicit approval.",
      },
      {
        name: "Memory",
        status: "Queued",
        description: "Saving travel preferences for future trips.",
      },
    ];
  }

  return [
    {
      name: "Planner",
      status: "Complete",
      description: "Objective decomposed into executable workstreams.",
    },
    {
      name: "Research",
      status: "Complete",
      description: "Live source queries prepared for Exa retrieval.",
    },
    {
      name: "Venue",
      status: "Running",
      description: "Scoring venues by capacity, access, and budget.",
    },
    {
      name: "Budget",
      status: "Running",
      description: "Checking feasibility against the stated constraint.",
    },
    {
      name: "Spotify",
      status: "Queued",
      description: "Preparing a warm corporate playlist direction.",
    },
    {
      name: "Approval",
      status: "Locked",
      description: "Bookings and payments require explicit approval.",
    },
  ];
}

function createTimeline(
  title: string,
  type: OperationType,
): OperationTimelineItem[] {
  if (type === "playlist") {
    return [
      {
        time: "09:00",
        title: "Operation created",
        detail: `SEO received: "${title}".`,
        status: "done",
      },
      {
        time: "09:01",
        title: "Playlist intent detected",
        detail:
          "SEO understood that this operation requires music curation instead of venue planning.",
        status: "done",
      },
      {
        time: "09:02",
        title: "Audience mood profile created",
        detail:
          "SEO selected a professional, warm, low-distraction seminar atmosphere.",
        status: "done",
      },
      {
        time: "09:03",
        title: "Music Agent curating tracks",
        detail:
          "Songs are being selected for arrival, networking, break time, and closing segments.",
        status: "running",
      },
      {
        time: "09:04",
        title: "Spotify Agent preparing playlist",
        detail:
          "SEO is preparing the playlist structure. Actual Spotify publishing will require connection and approval.",
        status: "running",
      },
      {
        time: "Pending",
        title: "Human approval required",
        detail:
          "SEO will not publish or modify a Spotify account without explicit confirmation.",
        status: "locked",
      },
    ];
  }

  if (type === "travel") {
    return [
      {
        time: "09:00",
        title: "Operation created",
        detail: `SEO received: "${title}".`,
        status: "done",
      },
      {
        time: "09:01",
        title: "Travel intent detected",
        detail:
          "SEO understood that this operation requires flight, hotel, and itinerary planning.",
        status: "done",
      },
      {
        time: "09:02",
        title: "Flight Agent activated",
        detail:
          "SEO is comparing route quality, timing, layovers, baggage, and estimated price.",
        status: "running",
      },
      {
        time: "Pending",
        title: "Human approval required",
        detail:
          "SEO will not book tickets, use passport details, or make payments without explicit confirmation.",
        status: "locked",
      },
    ];
  }

  return [
    {
      time: "09:00",
      title: "Operation created",
      detail: `SEO received: "${title}".`,
      status: "done",
    },
    {
      time: "09:01",
      title: "Planner Agent activated",
      detail:
        "The operation was split into research, recommendation, budget, execution, and approval workstreams.",
      status: "done",
    },
    {
      time: "09:02",
      title: "Research Agent prepared queries",
      detail:
        "SEO prepared live research queries for venues, trends, audience experience, and activity ideas.",
      status: "done",
    },
    {
      time: "09:03",
      title: "Execution agents running",
      detail:
        "Venue and budget agents are scoring possible options against the constraints.",
      status: "running",
    },
    {
      time: "09:04",
      title: "Recommendation layer forming",
      detail:
        "SEO is preparing a shortlist with reasoning, trade-offs, and approval checkpoints.",
      status: "running",
    },
    {
      time: "Pending",
      title: "Human approval required",
      detail:
        "SEO will not book, pay, or submit forms without explicit confirmation.",
      status: "locked",
    },
  ];
}

function createVenues(type: OperationType): VenueRecommendation[] {
  if (type !== "seminar" && type !== "general") return [];

  return [
    {
      name: "Marina Bay Convention Hall",
      score: "92",
      capacity: "280 pax",
      budget: "$8,900 est.",
      access: "Near MRT",
      reason: "Best balance of capacity, accessibility, and premium positioning.",
    },
    {
      name: "Suntec Seminar Suite",
      score: "88",
      capacity: "250 pax",
      budget: "$9,600 est.",
      access: "Central",
      reason:
        "Strong location, flexible room layout, and corporate-ready facilities.",
    },
    {
      name: "Lifelong Learning Institute Hall",
      score: "83",
      capacity: "300 pax",
      budget: "$6,800 est.",
      access: "Paya Lebar",
      reason:
        "Cost-efficient and accessible, but less premium for high-end clients.",
    },
  ];
}

function createPlaylists(type: OperationType): PlaylistRecommendation[] {
  if (type !== "playlist") return [];

  return [
    {
      name: "LPA Seminar — Warm Corporate Flow",
      mood: "Professional / Warm",
      duration: "2 hr 05 min",
      trackCount: "32 tracks",
      reason:
        "Best for guest arrival, networking, short breaks, and calm closing moments without distracting from the seminar.",
      tracks: [
        "Soft instrumental jazz",
        "Lo-fi corporate lounge",
        "Acoustic coffeehouse pop",
        "Warm piano ambience",
        "Light upbeat networking tracks",
      ],
    },
    {
      name: "Executive Networking Background",
      mood: "Light / Social",
      duration: "1 hr 45 min",
      trackCount: "26 tracks",
      reason:
        "Better suited for pre-event mingling and post-seminar networking where the room needs energy but not noise.",
      tracks: [
        "Nu jazz lounge",
        "Modern soul instrumental",
        "Clean acoustic rhythm",
        "Light electronic chill",
        "Soft upbeat cafe music",
      ],
    },
    {
      name: "Calm Focus Seminar Mix",
      mood: "Minimal / Focused",
      duration: "1 hr 30 min",
      trackCount: "22 tracks",
      reason:
        "Best for a more serious seminar tone where music should remain almost invisible in the background.",
      tracks: [
        "Minimal piano",
        "Ambient strings",
        "Soft lo-fi beats",
        "Gentle atmospheric pads",
        "Low-energy instrumental pop",
      ],
    },
  ];
}

export function createOperationPlan(
  title: string,
  options: CreateOperationPlanOptions = {},
): OperationPlan {
  const normalizedTitle = title.trim();
  const type = detectOperationType(normalizedTitle);

  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `operation-${Date.now()}`,
    title: normalizedTitle,
    type,
    progress: type === "playlist" ? 76 : 72,
    agents: createAgents(type),
    timeline: createTimeline(normalizedTitle, type),
    venues: createVenues(type),
    playlists: createPlaylists(type),
    researchBrief:
      options.researchBrief ??
      {
        summary:
          "SEO prepared an executive research brief based on the operation request. Connect an Exa API key to upgrade this from simulated research to live web intelligence.",
        signals: [
          "Prioritise accessibility, capacity, and budget control.",
          "Use interactive activities to make seminar content feel less lecture-heavy.",
          "Keep human approval before booking, payment, or vendor submission.",
        ],
        sources: [
          {
            title: "Exa live research not connected yet",
            url: "https://exa.ai",
          },
        ],
      },
  };
}