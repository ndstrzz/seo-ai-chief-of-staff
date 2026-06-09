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
          "SEO selected multiple playlist directions for the user to inspect before approval.",
        status: "done",
      },
      {
        time: "09:03",
        title: "Music Agent curated options",
        detail:
          "SEO prepared several playlist recommendations with track intent and song search strategy.",
        status: "running",
      },
      {
        time: "Pending",
        title: "Human approval required",
        detail:
          "The user must select one playlist direction before SEO creates it in Spotify.",
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
      id: "warm-corporate-flow",
      name: "LPA Seminar — Warm Corporate Flow",
      mood: "Professional / Warm",
      duration: "2 hr 05 min",
      trackCount: "18 tracks",
      reason:
        "Best all-round playlist for guest arrival, networking, breaks, and calm closing moments.",
      details:
        "This playlist keeps the room polished and premium without becoming distracting. It uses soft jazz, light acoustic textures, piano ambience, and gentle lounge tracks.",
      bestFor: "Seminars, client appreciation events, LPA talks, insurance talks.",
      seedQueries: [
        "lofi jazz instrumental",
        "acoustic coffeehouse instrumental",
        "soft piano instrumental",
        "corporate lounge jazz",
        "chillhop instrumental",
        "ambient piano",
      ],
      tracks: [
        {
          title: "Soft instrumental jazz",
          intent: "Warm arrival mood",
          searchQuery: "soft instrumental jazz corporate",
        },
        {
          title: "Lo-fi corporate lounge",
          intent: "Low-distraction networking",
          searchQuery: "lofi corporate lounge instrumental",
        },
        {
          title: "Acoustic coffeehouse instrumental",
          intent: "Friendly client atmosphere",
          searchQuery: "acoustic coffeehouse instrumental",
        },
        {
          title: "Warm piano ambience",
          intent: "Calm transition moments",
          searchQuery: "warm piano ambience instrumental",
        },
        {
          title: "Light upbeat networking tracks",
          intent: "Break time energy",
          searchQuery: "light upbeat networking instrumental",
        },
      ],
    },
    {
      id: "executive-networking-background",
      name: "Executive Networking Background",
      mood: "Light / Social",
      duration: "1 hr 45 min",
      trackCount: "18 tracks",
      reason:
        "Better for a room where people are mingling, chatting, and moving around before or after the main event.",
      details:
        "This option has slightly more rhythm and social energy. It still avoids lyrics-heavy or distracting tracks, but feels more lively than the warm corporate option.",
      bestFor: "Networking sessions, post-event mingling, client cocktail-style rooms.",
      seedQueries: [
        "nu jazz lounge instrumental",
        "modern soul instrumental",
        "light electronic chill instrumental",
        "soft upbeat cafe music",
        "corporate networking background music",
        "smooth lounge instrumental",
      ],
      tracks: [
        {
          title: "Nu jazz lounge",
          intent: "Premium social energy",
          searchQuery: "nu jazz lounge instrumental",
        },
        {
          title: "Modern soul instrumental",
          intent: "Warm conversational tone",
          searchQuery: "modern soul instrumental background",
        },
        {
          title: "Clean acoustic rhythm",
          intent: "Friendly movement",
          searchQuery: "clean acoustic rhythm instrumental",
        },
        {
          title: "Light electronic chill",
          intent: "Modern executive atmosphere",
          searchQuery: "light electronic chill instrumental",
        },
        {
          title: "Soft upbeat cafe music",
          intent: "Approachable break mood",
          searchQuery: "soft upbeat cafe instrumental",
        },
      ],
    },
    {
      id: "calm-focus-seminar-mix",
      name: "Calm Focus Seminar Mix",
      mood: "Minimal / Focused",
      duration: "1 hr 30 min",
      trackCount: "18 tracks",
      reason:
        "Best when the event should feel serious, calm, and almost silent in the background.",
      details:
        "This playlist is the least distracting option. It focuses on minimal piano, ambient textures, and gentle instrumental pieces that support concentration.",
      bestFor: "Formal seminars, legal/finance talks, serious briefing sessions.",
      seedQueries: [
        "minimal piano instrumental",
        "ambient strings instrumental",
        "soft lo-fi beats instrumental",
        "gentle atmospheric pads",
        "low energy instrumental pop",
        "calm focus instrumental music",
      ],
      tracks: [
        {
          title: "Minimal piano",
          intent: "Quiet professional focus",
          searchQuery: "minimal piano instrumental",
        },
        {
          title: "Ambient strings",
          intent: "Premium calm atmosphere",
          searchQuery: "ambient strings instrumental",
        },
        {
          title: "Soft lo-fi beats",
          intent: "Gentle pacing",
          searchQuery: "soft lofi beats instrumental",
        },
        {
          title: "Gentle atmospheric pads",
          intent: "Invisible background layer",
          searchQuery: "gentle atmospheric pads instrumental",
        },
        {
          title: "Low-energy instrumental pop",
          intent: "Light closing mood",
          searchQuery: "low energy instrumental pop",
        },
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