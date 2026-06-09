export type OperationType = "seminar" | "playlist" | "travel" | "general";

export type AgentStatus = "Complete" | "Running" | "Queued" | "Locked";

export type OperationAgent = {
  name: string;
  status: AgentStatus;
  description: string;
};

export type OperationTimelineItem = {
  time: string;
  title: string;
  detail: string;
  status: "done" | "running" | "queued" | "locked";
};

export type VenueRecommendation = {
  name: string;
  score: string;
  capacity: string;
  budget: string;
  access: string;
  reason: string;
};

export type PlaylistTrack = {
  title: string;
  intent: string;
  searchQuery: string;
};

export type PlaylistRecommendation = {
  id: string;
  name: string;
  mood: string;
  duration: string;
  trackCount: string;
  reason: string;
  details: string;
  bestFor: string;
  seedQueries: string[];
  tracks: PlaylistTrack[];
};

export type ResearchSource = {
  title: string;
  url: string;
};

export type ResearchBrief = {
  summary: string;
  signals: string[];
  sources: ResearchSource[];
};

export type OperationPlan = {
  id: string;
  title: string;
  type: OperationType;
  progress: number;
  agents: OperationAgent[];
  timeline: OperationTimelineItem[];
  venues: VenueRecommendation[];
  playlists: PlaylistRecommendation[];
  researchBrief: ResearchBrief;
};