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
  progress: number;
  agents: OperationAgent[];
  timeline: OperationTimelineItem[];
  venues: VenueRecommendation[];
  researchBrief: ResearchBrief;
};