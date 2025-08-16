import type { ServerStatus, WorkerMetrics } from "../types";

// Utility: pick a worker by name from the fixed tuple
export const getWorker = (
  status: ServerStatus,
  name:
    | "io"
    | "requests:pageviews"
    | "requests:unsupported-users"
    | "recording-workers"
): WorkerMetrics | undefined => {
  const entry = status.results.stats.server.workers.find((w) => w[0] === name);
  return entry?.[1];
};

export const msOrSeconds = (ms: number): string => {
  if (ms < 1000) return `${ms} ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)} s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r.toFixed(0)}s`;
};
