import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServerStatusCard from "@components/ServerStatusCard";
import type { ServerStatus, WorkerMetrics } from "../types";

const mkWorker = (over: Partial<WorkerMetrics> = {}): WorkerMetrics => ({
  wait_time: 0,
  workers: 0,
  waiting: 0,
  idle: 0,
  time_to_return: 0,
  recently_blocked_keys: [],
  top_keys: [],
  ...over,
});

const makeData = (): ServerStatus => ({
  status: "ok",
  region: "us-east",
  roles: ["api", "worker"],
  strict: true,
  server_issue: null,
  version: "1.0.0",
  results: {
    services: { redis: true, database: false },
    stats: {
      servers_count: 2,
      online: 10,
      session: 5,
      server: {
        cpus: 4,
        active_connections: 100,
        wait_time: 0,
        cpu_load: 0.25,
        timers: 2,
        workers: [
          ["requests:pageviews", mkWorker()],
          ["io", mkWorker()],
          ["requests:unsupported-users", mkWorker()],
          ["recording-workers", mkWorker()],
        ],
      },
    },
  },
});

describe("<ServerStatusCard />", () => {
  test("Renders all child sections with testIDs", () => {
    const data = makeData();
    render(<ServerStatusCard data={data} />);

    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("gridStats")).toBeTruthy();
    expect(screen.getByTestId("services")).toBeTruthy();
    expect(screen.getByTestId("workersOverview")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });
});
