import { OperationPlan } from "@/types/operation";

const STORAGE_PREFIX = "seo-operation-";
const MEMORY_KEY = "seo-operation-memory";

export type OperationMemoryItem = {
  id: string;
  title: string;
  status: "Running" | "Completed" | "Pending Approval";
  createdAt: string;
};

export function saveOperation(plan: OperationPlan) {
  localStorage.setItem(`${STORAGE_PREFIX}${plan.id}`, JSON.stringify(plan));

  const memory = getOperationMemory();

  const existingIndex = memory.findIndex((item) => item.id === plan.id);

  const nextItem: OperationMemoryItem = {
    id: plan.id,
    title: plan.title,
    status: "Running",
    createdAt: new Date().toISOString(),
  };

  const nextMemory =
    existingIndex >= 0
      ? memory.map((item) => (item.id === plan.id ? nextItem : item))
      : [nextItem, ...memory];

  localStorage.setItem(MEMORY_KEY, JSON.stringify(nextMemory.slice(0, 8)));
}

export function getOperationMemory(): OperationMemoryItem[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(MEMORY_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored) as OperationMemoryItem[];
  } catch {
    return [];
  }
}