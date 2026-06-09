import { OperationPlan } from "@/types/operation";

export function createOperationPlan(title: string): OperationPlan {
  const normalizedTitle = title.trim();

  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `operation-${Date.now()}`,
    title: normalizedTitle,
    progress: 68,
    agents: [
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
    ],
    timeline: [
      {
        time: "09:00",
        title: "Operation created",
        detail: `SEO received: "${normalizedTitle}".`,
        status: "done",
      },
      {
        time: "09:01",
        title: "Planner Agent activated",
        detail:
          "The operation was split into research, recommendation, budget, and approval workstreams.",
        status: "done",
      },
      {
        time: "09:02",
        title: "Research Agent prepared queries",
        detail:
          "SEO prepared live research queries for venues, trends, and activity ideas.",
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
        time: "Pending",
        title: "Human approval required",
        detail:
          "SEO will not book, pay, or submit forms without explicit confirmation.",
        status: "locked",
      },
    ],
    venues: [
      {
        name: "Marina Bay Convention Hall",
        score: "92",
        capacity: "280 pax",
        budget: "$8,900 est.",
        access: "Near MRT",
        reason:
          "Best balance of capacity, accessibility, and premium positioning.",
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
    ],
  };
}