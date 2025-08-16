import { render, screen } from "@testing-library/react";
import Header from "@components/Header";
import type { ServerStatus, WorkerMetrics } from "../types";

describe("<Header />", () => {
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

const baseData: ServerStatus = {
  status: "ok",
  region: "us-east-1",
  version: "1.2.3",
  server_issue: null,
  roles: [],
  strict: false,
  results: {
    services: {
      redis: true,
      database: true,
    },
    stats: {
      servers_count: 1,
      online: 1,
      session: 1,
      server: {
        cpus: 1,
        active_connections: 1,
        wait_time: 0,
        cpu_load: 0.1,
        timers: 1,
        workers: [
          ["requests:pageviews", mkWorker()],
          ["io", mkWorker()],
          ["requests:unsupported-users", mkWorker()],
          ["recording-workers", mkWorker()],
        ],
      },
    },
  },
};

  test("Render cluster status title and indicator", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText("Cluster Status")).toBeInTheDocument();
    expect(screen.getByTitle('Status: ok')).toBeInTheDocument();
  });

  test("Render version badge correctly", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });

  test("Render region information", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText("us-east-1")).toBeInTheDocument();
  });

  test("Render server issue message when provided", () => {
    const issueData = { ...baseData, server_issue: "Database down" };
    render(<Header data={issueData} />);
    expect(screen.getByText("Database down")).toBeInTheDocument();
  });

  test("Not render server issue message when null", () => {
    render(<Header data={baseData} />);
    const issueElement = screen.queryByText(/database down/i);
    expect(issueElement).not.toBeInTheDocument();
  });
});
